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
      account: string = _account
    ): Promise<void> => {
      if (!account) throw new Error(`invalid account id: "${account}"`);
      return contract
        .addDeposit(account, {
          value: amount,
        })
        .then(() => undefined);
    },
    releaseDeposit: async (account: string = _account): Promise<void> => {
      return contract.releaseDeposit(account).then(() => undefined);
    },
    releaseDeposits: async (): Promise<void> => {
      return contract.releaseDeposits({ gasLimit: GAS }).then(() => undefined);
    },
    hasDeposit: async (account: string = _account): Promise<boolean> => {
      if (!account) throw new Error(`invalid account id: "${account}"`);
      return contract.hasDeposit(account);
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
