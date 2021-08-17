export * from "./token";
export * from "./storage";
export * from "./registry";
export * from "./provider";

import { StorageAPI } from "./storage";
import { ProviderAPI } from "./provider";
import { RegistryAPI } from "./registry";

export type CoreAPI<T> = StorageAPI & ProviderAPI<T> & RegistryAPI;

/**
 * Options for init configuration
 */
export interface InitOptions {
  // Provider contract id.
  provider?: string;
  // Registry contract id.
  registry?: string;
  // Self-signed access token.
  token?: string;
}
