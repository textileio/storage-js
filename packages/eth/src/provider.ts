import { Signer, utils } from "ethers";
import {
  BridgeProvider__factory,
  BridgeProvider,
} from "@textile/eth-storage-bridge";
import type { ProviderAPI } from "@textile/core-storage";
import { PROVIDER_ID } from "./utils";

function initDeposit(contract: BridgeProvider, _account: string) {
  return {
    addDeposit: async (
      account: string = _account,
      amount = utils.parseUnits("360000", "gwei")
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
      return contract.releaseDeposits().then(() => undefined);
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

// TODO: This should not have to be async
export async function create(
  account: Signer,
  contractId: string = PROVIDER_ID
): Promise<ProviderAPI> {
  const contract = BridgeProvider__factory.connect(contractId, account);
  return initDeposit(contract, await account.getAddress());
}
