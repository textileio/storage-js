import { Runner } from "near-runner";
import { expect } from "chai";
import { create } from "../src/provider";
import { providers } from "near-api-js";

describe("eth/provider", () => {
  let runner: Runner;
  jest.setTimeout(60000);

  beforeAll(async () => {
    console.log(`Running in: ${Runner.getNetworkFromEnv()}`);
    runner = await Runner.create(async ({ runtime }) => ({
      provider: await runtime.createAndDeploy(
        "bridge-provider",
        `${__dirname}/builds/provider.wasm`
      ),
      alice: await runtime.createAccount("alice"),
    }));
  });
  test("hasDeposit", async () => {
    await runner.run(async ({ alice }) => {
      const contract = await create(
        alice.najAccount,
        "bridge-provider.test.near"
      );
      const ok = await contract.hasDeposit();
      expect(ok).to.be.false;
    });
  });

  test("apiEndpoint", async () => {
    await runner.run(async ({ provider, alice }) => {
      await provider.call(provider, "setApiEndpoint", {
        a: "https://provider.io",
      });
      const contract = await create(
        alice.najAccount,
        "bridge-provider.test.near"
      );
      const str = await contract.apiEndpoint();
      expect(str).to.equal("https://provider.io");
    });
  });

  test("addDeposit", async () => {
    await runner.run(async ({ alice }) => {
      const contract = await create(
        alice.najAccount,
        "bridge-provider.test.near"
      );
      await contract.addDeposit();
      expect(await contract.hasDeposit()).to.be.true;
    });
  });

  test("releaseDeposits", async () => {
    await runner.run(async ({ alice }) => {
      const contract = await create(
        alice.najAccount,
        "bridge-provider.test.near"
      );
      await contract.addDeposit("3000000000");
      let ok = await contract.hasDeposit("alice.test.near");
      expect(ok).to.be.true;

      // Sleep
      await new Promise((resolve) => setTimeout(resolve, 3000));

      await contract.releaseDeposits();
      ok = await contract.hasDeposit();
      expect(ok).to.be.false;
    });
  });

  test("releaseDeposit", async () => {
    await runner.run(async ({ alice }) => {
      const contract = await create(
        alice.najAccount,
        "bridge-provider.test.near"
      );
      await contract.addDeposit("3000000000", "alice.test.near");
      let ok = await contract.hasDeposit();
      expect(ok).to.be.true;

      // Sleep
      await new Promise((resolve) => setTimeout(resolve, 3000));

      await contract.releaseDeposit("alice.test.near");
      ok = await contract.hasDeposit("alice.test.near");
      expect(ok).to.be.false;
    });
  });
});
