import { expect } from "chai";
import { keyStores } from "near-api-js";

import { requestSignIn } from "../src/utils";
import { mocks } from "./utils";
import { create } from "../src/registry";

globalThis.window = globalThis.global as Window & typeof globalThis;
globalThis.document = { title: "documentTitle" } as Document;

const keyStore = new keyStores.InMemoryKeyStore();
const walletConnection = mocks.Registry(keyStore, "account.id");
const contract = create(walletConnection.account(), "contract.id");

Object.assign(globalThis.window, {
  location: {
    href: "http://example.com/location",
    assign(url: string) {
      this.href = url;
    },
  },
});

describe("near/registry", () => {
  describe("can interact with smart contract view methods", () => {
    beforeEach(async () => {
      keyStore.clear();
      await requestSignIn(walletConnection, {
        successUrl: "http://example.com/success",
        failureUrl: "http://example.com/fail",
      });
    });

    test("listProviders", async () => {
      const res = await contract.listProviders();
      expect(res).to.have.lengthOf(1);
    });
  });
});
