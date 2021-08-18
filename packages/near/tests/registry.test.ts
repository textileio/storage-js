import { Runner } from "near-runner";
import { expect } from "chai";
import { create } from "../src/registry";

describe("near/registry", () => {
  let runner: Runner;
  jest.setTimeout(60000);

  beforeAll(async () => {
    console.log(`Running in: ${Runner.getNetworkFromEnv()}`);
    runner = await Runner.create(async ({ runtime }) => ({
      registry: await runtime.createAndDeploy(
        "bridge-registry",
        `${__dirname}/builds/registry.wasm`
      ),
      alice: await runtime.createAccount("alice"),
    }));
  });

  test("listProviders", async () => {
    await runner.run(async ({ registry, alice }) => {
      await registry.call(registry, "addProvider", {
        provider: "provider.test.near",
      });
      const contract = create(alice.najAccount, "bridge-registry.test.near");
      const providers = await contract.listProviders();
      expect(providers).to.contain("provider.test.near");
    });
  });
});
