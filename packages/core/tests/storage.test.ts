/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "chai";
import mocked from "fetch-mock-jest";
import { FormData, File } from "formdata-node";
import { FormDataEncoder } from "form-data-encoder";
import { Readable } from "stream";
import {
  StorageAPI,
  create,
  StorageRequestStatus,
  MarketDealStatus,
} from "../src/storage";
import { createSigner } from "./utils";
import { createToken } from "../src/token";
jest.mock("cross-fetch", () => {
  const crossFetch = jest.requireActual("cross-fetch");
  const fetchMock = mocked.sandbox();
  Object.assign(fetchMock.config, { fetch: crossFetch });
  return fetchMock;
});
import fetchMock from "cross-fetch";

let storage: StorageAPI;

describe("core/storage", () => {
  beforeAll(() => {
    (fetchMock as any)
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
      )
      .get(
        "https://fake.gatway.dev/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks",
        async () => {
          return "Hello, world!";
        }
      )
      .post("https://fake.broker.dev/graphql", async () => {
        const node = {
          cid: { "/": "QmFake" },
          status: StorageRequestStatus.Success,
          id: "fakeId",
          batch: {
            payload: {
              deals: {
                nodes: [
                  {
                    deal_expiration: 0,
                    deal_id: 0,
                    deal_status: MarketDealStatus.Active,
                    miner: "fakeMiner",
                  },
                ],
              },
            },
          },
        };
        return { data: { requests: { nodes: [node] } } };
      });
  });

  beforeEach(async () => {
    const { signer, kid } = createSigner();
    const aud = "provider";
    const { token } = await createToken(signer, { kid }, { aud });
    const host = "https://fake.broker.dev";
    const gateway = "https://fake.gatway.dev";
    storage = create({ token, host, gateway });
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

  test("should be able to get content based on previous cid", async () => {
    const helloWorld = await storage.fetchByCid(
      "QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks"
    );
    expect(helloWorld.status).to.equal(200);
    expect(await helloWorld.text()).to.equal("Hello, world!");
  });

  test("should be able to get status of some data", async () => {
    const { request, deals } = await storage.status("fakeId");
    expect(request.status === "SUCCESS").to.be.true;
    expect(deals).to.have.lengthOf(1);
  });

  test("should be able to get status based on cid", async () => {
    const requests = await storage.statusByCid("QmFake");
    expect(requests.length).to.equal(1);
    expect(requests[0].request.status === "SUCCESS").to.be.true;
    expect(requests[0].deals).to.have.lengthOf(1);
  });
});
