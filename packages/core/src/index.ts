export * from "./token";
export * from "./storage";
export * from "./registry";
export * from "./provider";

import { StorageAPI } from "./storage";
import { ProviderAPI } from "./provider";
import { RegistryAPI } from "./registry";

export type CoreAPI = StorageAPI & ProviderAPI & RegistryAPI;
