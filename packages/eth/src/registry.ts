import type { Signer } from "ethers";
import {
  BridgeRegistry__factory,
  BridgeRegistry,
} from "@textile/eth-storage-bridge";
import type { RegistryAPI } from "@textile/core-storage";
import { REGISTRY_ID } from "./utils";

function initRegistry(contract: BridgeRegistry) {
  return {
    listProviders: async (): Promise<string[]> => {
      return contract.listProviders();
    },
  };
}

export { RegistryAPI };

export function create(
  account: Signer,
  contractId: string = REGISTRY_ID
): RegistryAPI {
  const contract = BridgeRegistry__factory.connect(contractId, account);
  return initRegistry(contract);
}
