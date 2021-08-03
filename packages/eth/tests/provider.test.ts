import { expect, use } from "chai";
import { utils } from "ethers";
import { MockProvider, solidity } from "ethereum-waffle";
import { BridgeProvider__factory } from "@textile/eth-storage-bridge";
import { create, ProviderAPI } from "../src/provider";

use(solidity);

const eth = new MockProvider();
const [wallet, external] = eth.getWallets();

let contract: ProviderAPI;

describe("eth/provider", () => {
  jest.setTimeout(20000);
  beforeEach(async () => {
    jest.setTimeout(10000);
    const factory = new BridgeProvider__factory(wallet);
    const provider = await factory.deploy();
    await provider.initialize();
    contract = await create(external, provider.address);
    await provider.setApiEndpoint("https://provider.io");
  });
  test("hasDeposit", async () => {
    const ok = await contract.hasDeposit();
    expect(ok).to.be.false;
  });

  test("apiEndpoint", async () => {
    const str = await contract.apiEndpoint();
    expect(str).to.equal("https://provider.io");
  });

  test("addDeposit", async () => {
    await contract.addDeposit();
    expect(await contract.hasDeposit()).to.be.true;
    await eth.send("evm_increaseTime", [5]);
    await eth.send("evm_mine", []);
  });

  test("releaseDeposits", async () => {
    const addr = await external.getAddress();
    await contract.addDeposit(addr, utils.parseUnits("500", "gwei"));

    await eth.send("evm_increaseTime", [6]);
    await eth.send("evm_mine", []);

    await contract.releaseDeposits();
    const ok = await contract.hasDeposit();
    expect(ok).to.be.false;
  });

  test("releaseDeposit", async () => {
    const addr = await external.getAddress();
    await contract.addDeposit(addr, utils.parseUnits("500", "gwei"));

    await eth.send("evm_increaseTime", [6]);
    await eth.send("evm_mine", []);

    await contract.releaseDeposit();
    const ok = await contract.hasDeposit();
    expect(ok).to.be.false;
  });
});
