import { expect } from "chai";
import { keyStores } from "near-api-js";

import { requestSignIn } from "../src/utils";
import { mocks } from "./utils";
import { create, ProviderAPI } from "../src/provider";

globalThis.window = globalThis.global as Window & typeof globalThis;
globalThis.document = { title: "documentTitle" } as Document;

const keyStore = new keyStores.InMemoryKeyStore();
const walletConnection = mocks.Provider(keyStore, "account.id");
let contract: ProviderAPI<string>;

Object.assign(globalThis.window, {
  location: {
    href: "http://example.com/location",
    assign(url: string) {
      this.href = url;
    },
  },
});

describe("near/provider", () => {
  beforeAll(async () => {
    contract = await create(walletConnection.account(), "contract.id");
  });
  describe("can interact with smart contract view methods", () => {
    beforeEach(async () => {
      keyStore.clear();
      await requestSignIn(walletConnection, {
        successUrl: "http://example.com/success",
        failureUrl: "http://example.com/fail",
      });
    });

    test("hasDeposit", async () => {
      const ok = await contract.hasDeposit();
      expect(ok).to.be.false;
    });

    test("apiEndpoint", async () => {
      const str = await contract.apiEndpoint();
      expect(str).to.equal("https://provider.io");
    });
  });

  describe("can interact with smart contract change methods", () => {
    test("addDeposit", async () => {
      await contract.addDeposit();
      expect(await contract.hasDeposit()).to.be.true;
    });

    test("releaseDeposits", async () => {
      const res = await contract.releaseDeposits();
      expect(res).to.be.undefined;
      expect(await contract.hasDeposit()).to.be.false;
    });

    test("releaseDeposit", async () => {
      await contract.addDeposit();
      const res = await contract.releaseDeposit();
      expect(res).to.be.undefined;
      expect(await contract.hasDeposit()).to.be.false;
    });
  });
});
