import { Contract as NearContract, Account } from "near-api-js";
import { ProviderAPI, AddDeposit, ReleaseDeposit } from "@textile/core-storage";
import { DEPOSIT, GAS, CONTRACT_ID } from "./utils";

interface DepositContract extends NearContract {
  addDeposit: (args: {
    args: { account?: string };
    gas?: string;
    amount?: string;
  }) => Promise<AddDeposit>;
  releaseDeposit: (args: {
    args: { account?: string };
    gas?: string;
    amount?: string;
  }) => Promise<ReleaseDeposit>;
  releaseDeposits: (args: {
    args: unknown;
    gas?: string;
    amount?: string;
  }) => Promise<void>;
  hasDeposit: (args: { account: string }) => Promise<boolean>;
  apiEndpoint: (args: unknown) => Promise<string>;
}

function initDeposit(contract: DepositContract, _account: string) {
  return {
    addDeposit: async (account: string = _account): Promise<void> => {
      if (!account) throw new Error(`invalid account id: "${account}"`);
      return contract
        .addDeposit({
          args: { account },
          gas: GAS,
          amount: DEPOSIT,
        })
        .then(() => undefined);
    },
    releaseDeposit: async (account: string = _account): Promise<void> => {
      return contract
        .releaseDeposit({ args: { account }, gas: GAS })
        .then(() => undefined);
    },
    releaseDeposits: async (): Promise<void> => {
      return contract
        .releaseDeposits({ args: {}, gas: GAS })
        .then(() => undefined);
    },
    hasDeposit: async (account: string = _account): Promise<boolean> => {
      if (!account) throw new Error(`invalid account id: "${account}"`);
      return contract.hasDeposit({ account });
    },
    apiEndpoint: async (): Promise<string> => {
      return contract.apiEndpoint({});
    },
  };
}

export { ProviderAPI };

export async function create(
  account: Account,
  contractId: string = CONTRACT_ID
): Promise<ProviderAPI> {
  const contract = new NearContract(account, contractId, {
    // View methods are read-only – they don't modify the state, but usually return some value
    viewMethods: ["hasDeposit", "apiEndpoint"],
    // Change methods can modify the state, but you don't receive the returned value when called
    changeMethods: ["addDeposit", "releaseDeposit", "releaseDeposits"],
  }) as DepositContract;

  return initDeposit(contract, account.accountId);
}
