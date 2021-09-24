import { Runner } from "near-runner";
import { expect } from "chai";
import { requestSignIn, estimateDeposit } from "../src/utils";
import { WalletConnection, Near } from "near-api-js";

globalThis.window = globalThis as Window & typeof globalThis;
globalThis.document = { title: "documentTitle" } as Document;

describe("near/utils", () => {
  jest.setTimeout(60000);
  let runner: Runner;
  let lastRedirectUrl: string;
  let history: [unknown, string, string | null | undefined][] = [];

  beforeAll(async () => {
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
        replaceState: (
          data: unknown,
          title: string,
          url?: string | null
        ): void => {
          history.push([data, title, url]);
        },
      },
    });
    console.log(`Running in: ${Runner.getNetworkFromEnv()}`);
    runner = await Runner.create(async ({ runtime }) => ({
      alice: await runtime.createAccount("alice"),
    }));
  });

  test("requestSignIn", async () => {
    await runner.run(async ({ alice }) => {
      const wallet = new WalletConnection(
        {
          connection: alice.connection,
          config: {
            networkId: "test.near",
            walletUrl: "http://example.com/wallet",
          },
          account: () => alice.najAccount,
        } as unknown as Near,
        "prefix"
      );
      await requestSignIn(wallet, {
        successUrl: "http://example.com/success",
        failureUrl: "http://example.com/fail",
      });
      const accounts = await alice.keyStore.getAccounts("test.near");
      expect(accounts).to.have.length(1);
      expect(accounts[0]).to.match(/^pending_key.+/);
      const url = new URL(lastRedirectUrl);
      const params = url.searchParams;
      const publicKey = params.get("public_key");
      expect(publicKey).to.equal(
        (await alice.keyStore.getKey("test.near", accounts[0]))
          .getPublicKey()
          .toString()
      );
    });
  });

  test("estimateDeposit", () => {
    // ~ 1/4 NEAR or 250000000000000000000000 yocto-NEAR
    const expected = "249600000000000000000000";
    const observed = estimateDeposit(600);
    expect(expected).to.equal(observed);
    const ten = "4160000000000000000000";
    expect(estimateDeposit(10.1)).to.equal(ten);
  });
});
