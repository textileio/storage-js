import { expect } from "chai";
import fetchMock from "fetch-mock-jest";
import { FormData, File } from "formdata-node";
import { Encoder } from "form-data-encoder";
import { Readable } from "stream";
import { StorageAPI, Status, create } from "../src/storage";
import { createSigner } from "./utils";
import { createAndSignToken } from "../src/token";

// // Mock env setup
// globalThis.window = { localStorage } as Window & typeof globalThis;
// globalThis.document = { title: "documentTitle" } as Document;

// let history: [any, string, string | null | undefined][] = [];
// let lastRedirectUrl: string;
let storage: StorageAPI;
// const keyStore = new keyStores.InMemoryKeyStore();
// let walletConnection: WalletConnection;

describe("core/storage", () => {
  beforeAll(() => {
    fetchMock
      .postOnce("https://fake.broker.dev/upload", () => {
        return { throws: new Error("upload failed") };
      })
      .post(
        "https://fake.broker.dev/upload",
        () => {
          // TODO: Inspect the body and do some extra checks
          return {
            id: "fakeId",
            cid: {
              "/": "fakeCid",
            },
            status_code: Status.Batching,
          };
        },
        { overwriteRoutes: false }
      )
      .get("https://fake.broker.dev/storagerequest/fakeId", () => {
        // TODO: Inspect the body and do some extra checks
        return {
          request: {
            id: "fakeId",
            cid: {
              "/": "fakeCid",
            },
            status_code: Status.Success,
          },
          deals: [
            {
              miner: "miner1",
              deal_id: 12345,
              deal_expiration: 1945916,
            },
            {
              miner: "miner2",
              deal_id: 54321,
              deal_expiration: 1945856,
            },
            {
              miner: "miner3",
              deal_id: 98765,
              deal_expiration: 1942976,
            },
          ],
        };
      });
  });
  beforeEach(async () => {
    const { signer, kid } = createSigner();
    const aud = "provider";
    const token = await createAndSignToken(signer, { kid }, { aud });
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
    } catch (err) {
      expect(err.message).to.include("upload failed");
    }
    const request = await storage.store(file as any);
    expect(request.id).to.equal("fakeId");
    expect(request.cid).to.deep.equal({ "/": "fakeCid" });
    expect(request.status_code).to.equal(Status.Batching);
  });

  test("should be able to store some data using streams", async () => {
    const formData = new FormData();
    formData.set("file", "Hello, world!");
    const encoder = new Encoder(formData);
    const request = await storage.store(Readable.from(encoder) as any, {
      headers: encoder.headers,
    });

    expect(request.id).to.equal("fakeId");
    expect(request.cid).to.deep.equal({ "/": "fakeCid" });
    expect(request.status_code).to.equal(Status.Batching);
  });

  test("should be able to get status of some data", async () => {
    const file = new File(["Hello, world!"], "welcome.txt", {
      type: "text/plain",
      lastModified: new Date().getTime(),
    });

    // Test global fallback
    (globalThis as any).FormData = FormData;

    const { id } = await storage.store(file as any);

    const { request, deals } = await storage.status(id);
    expect(request).to.have.property("status_code", Status.Success);
    expect(deals).to.have.lengthOf(3);
  });
});
