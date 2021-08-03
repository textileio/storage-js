import { expect } from "chai";
import { WalletConnection, keyStores } from "near-api-js";

import { requestSignIn } from "../src/utils";
import { mocks } from "./utils";

globalThis.window = globalThis as Window & typeof globalThis;
globalThis.document = { title: "documentTitle" } as Document;

const keyStore = new keyStores.InMemoryKeyStore();
let walletConnection: WalletConnection;
let lastRedirectUrl: string;
let history: [any, string, string | null | undefined][] = [];

describe("near/utils", () => {
  beforeEach(async () => {
    lastRedirectUrl = "";
    history = [];
    Object.assign(globalThis.window, {
      location: {
        href: "http://example.com/location",
        assign(url: string) {
          lastRedirectUrl = url;
          this.href = lastRedirectUrl;
        },
      },
      history: {
        replaceState: (data: any, title: string, url?: string | null): void => {
          history.push([data, title, url]);
        },
      },
    });
    walletConnection = mocks.Provider(keyStore, "fakeAccount.networkId");
  });
  describe("can request sign in", () => {
    beforeEach(() => keyStore.clear());

    test("wraps the wallet connection sign in", async () => {
      return await requestSignIn(walletConnection, {
        successUrl: "http://example.com/success",
        failureUrl: "http://example.com/fail",
      });
    });

    afterEach(async () => {
      const accounts = await keyStore.getAccounts("networkId");
      expect(accounts).to.have.length(1);
      expect(accounts[0]).to.match(/^pending_key.+/);
      const url = new URL(lastRedirectUrl);
      const params = url.searchParams;
      const publicKey = params.get("public_key");
      expect(publicKey).to.equal(
        (await keyStore.getKey("networkId", accounts[0]))
          .getPublicKey()
          .toString()
      );
    });
  });

  describe("can request sign out", () => {
    test("uses the default wallet connection sign out", () => {
      // TODO: Right now, this is just pass or fail, should test properly with shims etc
      walletConnection.signOut();
    });
  });
});
