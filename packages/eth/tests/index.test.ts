import { expect, use } from "chai";
import { utils } from "ethers";
import { MockProvider, solidity } from "ethereum-waffle";
import fetchMock from "fetch-mock-jest";
import { FormData } from "formdata-node";
import { Readable } from "stream";
import { Encoder } from "form-data-encoder";
import {
  BridgeProvider__factory,
  BridgeRegistry__factory,
} from "@textile/eth-storage-bridge";
import { init, CoreAPI, Status } from "../src";

use(solidity);

const eth = new MockProvider();
const [wallet, external] = eth.getWallets();

let contract: CoreAPI;

describe("eth/main", () => {
  jest.setTimeout(20000);
  beforeAll(async () => {
    jest.setTimeout(10000);
    fetchMock.post(
      "https://provider.io/upload",
      () => {
        return {
          id: "fakeId",
          cid: {
            "/": "fakeCid",
          },
          status_code: Status.Batching,
        };
      },
      { overwriteRoutes: false }
    );
  });
  beforeEach(async () => {
    jest.setTimeout(10000);
    const providerFactory = new BridgeProvider__factory(wallet);
    const provider = await providerFactory.deploy();
    await provider.initialize();

    const registryFactory = new BridgeRegistry__factory(wallet);
    const registry = await registryFactory.deploy();
    await registry.initialize();

    await provider.setApiEndpoint("https://provider.io");
    await registry.addProvider(provider.address);
    contract = await init(wallet, { registry: registry.address });
  });

  test("initialize, deposit, and store", async () => {
    jest.setTimeout(10000);
    await contract.addDeposit(
      external.address,
      utils.parseUnits("500", "gwei")
    );

    const formData = new FormData();
    formData.set("file", "Hello, world!");
    const encoder = new Encoder(formData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await contract.store(Readable.from(encoder) as any, {
      headers: encoder.headers,
    });

    await eth.send("evm_increaseTime", [5]);
    await eth.send("evm_mine", []);

    await contract.releaseDeposits();
    const ok = await contract.hasDeposit();
    expect(ok).to.be.false;
  });
});
