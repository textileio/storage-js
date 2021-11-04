import type { Account } from "near-api-js";
import type {
  StandardClaims,
  CoreAPI,
  InitOptions,
} from "@textile/core-storage";
import { create as createStorage } from "@textile/core-storage";
import { create as createRegistry } from "./registry";
import { create as createProvider } from "./provider";
import { create as createToken } from "./token";

export * from "./utils";
export { createToken };
export {
  CoreAPI,
  StandardClaims,
  RequestStatus,
  StorageRequest,
  DealInfo,
  InitOptions,
  OpenOptions,
  StorageAPI,
  RegistryAPI,
  ProviderAPI,
  DepositReleased,
  DepositAdded,
  StorageConfig,
  Header,
  Signer,
} from "@textile/core-storage";

const TOS = `
This is a beta release of @textile/near-storage. Do not store personal, encrypted, or illegal data.
Data will not be available permanently on either Filecoin or IPFS. See the full terms of service
(TOS) for details: https://near.storage/terms`;

/**
 * Initialize a Filecoin Storage Interface.
 * This will generate a new JWT token, signed by the user for interacting with a remote
 * Bridge Provider. If no Bridge Provider is given, this will also query the on-chain Bridge
 * Registry to find a suitable Provider.
 *
 * @param account User account as derived from a `ConnectedWallet`.
 * @param opts Additional configuration options. Possible values include a pre-signed token,
 * registry contract, provider contract, and standard JWT claims.
 * @returns A promise that resolves to a CoreAPI object.
 */
export async function init(
  account: Account,
  opts: InitOptions & StandardClaims = {}
): Promise<CoreAPI<string>> {
  // TODO: Eventually remove this in favor of wallet singing information?
  console.info(TOS);

  // eslint-disable-next-line prefer-const
  let { registry, provider, token, ...claims } = opts;
  const reg = createRegistry(account, registry);
  if (!provider) {
    provider = await reg.listProviders().then((providers) => providers.pop());
  }
  const prov = await createProvider(account, provider);
  const host = await prov.apiEndpoint();
  const { accountId } = account;
  const { signer, networkId } = account.connection;
  // TODO: Need to match the token expiration w/ the locked funds expiration
  if (!token) {
    token = await createToken(signer, {
      accountId,
      networkId,
      aud: provider,
      ...claims,
    });
  }
  const store = createStorage({ token, host });
  return { ...prov, ...reg, ...store };
}
