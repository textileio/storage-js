import { Signer } from "ethers";
import type { BigNumber } from "ethers";
import {
  BridgeProvider__factory,
  BridgeProvider,
} from "@textile/eth-storage-bridge";
import type { ProviderAPI } from "@textile/core-storage";
import { PROVIDER_ID, GAS, DEPOSIT } from "./utils";

function initDeposit(contract: BridgeProvider, _account: string) {
  return {
    addDeposit: async (
      amount = DEPOSIT,
      depositee: string = _account
    ): Promise<void> => {
      if (!depositee) throw new Error(`invalid depositee id: "${depositee}"`);
      return contract
        .addDeposit(depositee, {
          value: amount,
        })
        .then((tx) => tx.wait().then(() => undefined));
    },
    releaseDeposit: async (depositee: string = _account): Promise<void> => {
      return contract
        .releaseDeposit(depositee)
        .then((tx) => tx.wait().then(() => undefined));
    },
    releaseDeposits: async (): Promise<void> => {
      return contract
        .releaseDeposits({ gasLimit: GAS })
        .then((tx) => tx.wait().then(() => undefined));
    },
    hasDeposit: async (depositee: string = _account): Promise<boolean> => {
      if (!depositee) throw new Error(`invalid depositee id: "${depositee}"`);
      return contract.hasDeposit(depositee);
    },
    apiEndpoint: async (): Promise<string> => {
      return contract.apiEndpoint();
    },
  };
}

export { ProviderAPI };

export async function create(
  account: Signer,
  contractId: string = PROVIDER_ID
): Promise<ProviderAPI<BigNumber>> {
  const contract = BridgeProvider__factory.connect(contractId, account);
  return initDeposit(contract, await account.getAddress());
}
