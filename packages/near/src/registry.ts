import { Contract as NearContract, Account } from "near-api-js";
import { RegistryAPI } from "@textile/core-storage";
import { CONTRACT_ID } from "./utils";

interface RegistryContract extends NearContract {
  listProviders: () => Promise<string[]>;
}

function initRegistry(contract: RegistryContract) {
  return {
    listProviders: async (): Promise<string[]> => {
      return contract.listProviders();
    },
  };
}

export { RegistryAPI };

export function create(
  account: Account,
  contractId: string = CONTRACT_ID
): RegistryAPI {
  const contract = new NearContract(account, contractId, {
    // View methods are read-only – they don't modify the state, but usually return some value
    viewMethods: ["listProviders"],
    changeMethods: [],
  }) as RegistryContract;

  return initRegistry(contract);
}
