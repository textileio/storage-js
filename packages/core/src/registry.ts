export interface RegistryAPI {
  listProviders: () => Promise<string[]>;
}
