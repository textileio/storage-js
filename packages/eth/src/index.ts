import type { BigNumber, Signer } from "ethers";
import type {
  CoreAPI,
  StandardClaims,
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
  Request,
  RequestInfo,
  Deal,
  InitOptions,
  OpenOptions,
  StorageAPI,
  RegistryAPI,
  ProviderAPI,
  DepositAdded,
  DepositReleased,
  StorageConfig,
  Header,
  Signer,
} from "@textile/core-storage";

const TOS = `
This is a beta release of @textile/eth-storage. Do not store personal, encrypted, or illegal data.
Data will not be available permanently on either Filecoin or IPFS. See the full terms of service
(TOS) for details: https://eth.storage/terms`;

/**
 * Initialize a Filecoin Storage Interface.
 * This will generate a new JWT token, signed by the user for interacting with a remote
 * Bridge Provider. If no Bridge Provider is given, this will also query the on-chain Bridge
 * Registry to find a suitable Provider.
 *
 * @param account User account as a `ethers.Signer` object.
 * @param opts Additional configuration options. Possible values include a pre-signed token,
 * registry contract, provider contract, and standard JWT claims.
 * @returns A promise that resolves to a CoreAPI object.
 */
export async function init(
  account: Signer,
  opts: InitOptions & StandardClaims = {}
): Promise<CoreAPI<BigNumber>> {
  // TODO: Eventually remove this in favor of wallet singing information?
  console.info(TOS);

  // eslint-disable-next-line prefer-const
  let { registry, provider, token, ...claims } = opts;
  const reg = createRegistry(account, registry);
  if (!provider) {
    const [first] = await reg.listProviders();
    provider = first;
  }
  const prov = await createProvider(account, provider);
  const host = await prov.apiEndpoint();
  // TODO: Need to match the token expiration w/ the locked funds expiration
  if (!token) {
    token = await createToken(account, {
      aud: provider,
      ...claims,
    });
  }
  const store = createStorage({ token, host });
  return { ...prov, ...reg, ...store };
}
