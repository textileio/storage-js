import { Contract as NearContract, Account } from "near-api-js";
import { ProviderAPI } from "@textile/core-storage";
import { DEPOSIT, GAS, CONTRACT_ID } from "./utils";

interface DepositContract extends NearContract {
  addDeposit: (args: {
    args: { depositee?: string };
    gas?: string;
    amount?: string;
  }) => Promise<void>;
  releaseDeposit: (args: {
    args: { depositee?: string };
    gas?: string;
    amount?: string;
  }) => Promise<void>;
  releaseDeposits: (args: {
    args: unknown;
    gas?: string;
    amount?: string;
  }) => Promise<void>;
  hasDeposit: (args: { depositee: string }) => Promise<boolean>;
  apiEndpoint: (args: unknown) => Promise<string>;
}

function initDeposit(contract: DepositContract, account: string) {
  return {
    addDeposit: async (
      amount: string = DEPOSIT,
      depositee: string = account
    ): Promise<void> => {
      if (!depositee) throw new Error(`invalid depositee id: "${depositee}"`);
      return contract
        .addDeposit({
          args: { depositee },
          gas: GAS,
          amount,
        })
        .then(() => undefined);
    },
    releaseDeposit: async (depositee: string = account): Promise<void> => {
      return contract
        .releaseDeposit({ args: { depositee }, gas: GAS })
        .then(() => undefined);
    },
    releaseDeposits: async (): Promise<void> => {
      return contract
        .releaseDeposits({ args: {}, gas: GAS })
        .then(() => undefined);
    },
    hasDeposit: async (depositee: string = account): Promise<boolean> => {
      if (!depositee) throw new Error(`invalid depositee id: "${depositee}"`);
      return contract.hasDeposit({ depositee });
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
): Promise<ProviderAPI<string>> {
  const contract = new NearContract(account, contractId, {
    // View methods are read-only – they don't modify the state, but usually return some value
    viewMethods: ["hasDeposit", "apiEndpoint"],
    // Change methods can modify the state, but you don't receive the returned value when called
    changeMethods: ["addDeposit", "releaseDeposit", "releaseDeposits"],
  }) as DepositContract;

  return initDeposit(contract, account.accountId);
}
