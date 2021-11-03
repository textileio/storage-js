/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "chai";
import fetchMock from "fetch-mock-jest";
import { FormData, File } from "formdata-node";
import { FormDataEncoder } from "form-data-encoder";
import { Readable } from "stream";
import { StorageAPI, create } from "../src/storage";
import { createSigner } from "./utils";
import { createToken } from "../src/token";

let storage: StorageAPI;

describe("core/storage", () => {
  beforeAll(() => {
    fetchMock
      .postOnce("https://fake.broker.dev/upload", () => {
        return { throws: new Error("upload failed") };
      })
      .postOnce(
        "https://fake.broker.dev/upload",
        {
          body: "not found",
          status: 404,
        },
        { overwriteRoutes: false }
      )
      .post(
        "https://fake.broker.dev/upload",
        () => {
          // TODO: Inspect the body and do some extra checks
          return {
            id: "fakeId",
            cid: {
              "/": "fakeCid",
            },
            status_code: "Batching",
          };
        },
        { overwriteRoutes: false }
      );
  });

  beforeEach(async () => {
    const { signer, kid } = createSigner();
    const aud = "provider";
    const { token } = await createToken(signer, { kid }, { aud });
    const host = "https://fake.broker.dev";
    storage = create({ token, host });
  });

  test("should be able to store some data using File objects", async () => {
    // Test global fallback
    (globalThis as any).FormData = FormData;

    const file = new File(["Hello, world!"], "welcome.txt", {
      type: "text/plain",
      lastModified: new Date().getTime(),
    });

    try {
      await storage.store(file as any);
      throw new Error("wrong error");
    } catch (err: any) {
      expect(err.message).to.include("upload failed");
    }
    try {
      await storage.store(file as any);
      throw new Error("wrong error");
    } catch (err: any) {
      expect(err.message).to.include("not found");
    }
    const request = await storage.store(file as any);
    expect(request.id).to.equal("fakeId");
    expect(request.cid).to.deep.equal({ "/": "fakeCid" });
    expect(request.status).to.equal("BATCHING");
  });

  test("should be able to store some data using streams", async () => {
    const formData = new FormData();
    formData.set("file", "Hello, world!");
    const encoder = new FormDataEncoder(formData);
    const request = await storage.store(Readable.from(encoder) as any, {
      headers: encoder.headers,
    });

    expect(request.id).to.equal("fakeId");
    expect(request.cid).to.deep.equal({ "/": "fakeCid" });
    expect(request.status).to.equal("BATCHING");
  });
});

describe("core/storage", () => {
  beforeEach(async () => {
    const { signer, kid } = createSigner();
    const aud = "provider";
    const { token } = await createToken(signer, { kid }, { aud });
    storage = create({ token, host: "https://broker.staging.textile.dev" });
  });
  test("should be able to get status of some data", async () => {
    const { request, deals } = await storage.status(
      "01fdfw1zggv7esyxja69r6rf5h"
    );
    expect(request.status === "DEAL_MAKING").to.be.true;
    expect(deals).to.have.lengthOf(23);
  });

  test("should be able to get status based on cid", async () => {
    const requests = await storage.statusByCid(
      "QmNr25YGwwywiA7mpuaRGDCrBP7hiwbQJChyp1gzKCC8Sc"
    );
    expect(requests).to.have.lengthOf(13);
    expect(requests[0].request.status === "SUCCESS").to.be.true;
    expect(requests[0].deals).to.have.lengthOf(0);
  });
});
