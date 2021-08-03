import { expect, use } from "chai";
import { MockProvider, solidity } from "ethereum-waffle";
import { BridgeRegistry__factory } from "@textile/eth-storage-bridge";
import { create, RegistryAPI } from "../src/registry";

use(solidity);

const [wallet, external] = new MockProvider().getWallets();
let contract: RegistryAPI;

describe("eth/registry", () => {
  describe("can interact with the deployed registry", () => {
    beforeEach(async () => {
      const factory = new BridgeRegistry__factory(wallet);
      const registry = await factory.deploy();
      await registry.initialize();
      contract = create(external, registry.address);
      await registry.addProvider(wallet.address);
    });

    test("listProviders", async () => {
      const res = await contract.listProviders();
      expect(res).to.have.lengthOf(1);
    });
  });
});
