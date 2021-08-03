import type { Account } from "near-api-js";
import type { StandardClaims, CoreAPI } from "@textile/core-storage";
import { create as createStorage } from "@textile/core-storage";
import { create as createRegistry } from "./registry";
import { create as createProvider } from "./provider";
import { create as createToken } from "./token";

export * from "./utils";

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

const TOS = `
This is a beta release of @textile/near-storage. Do not store personal, encrypted, or illegal data.
Data will not be available permanently on either Filecoin or IPFS. See the full terms of service
(TOS) for details: https://near.storage/terms`;

export async function init(
  account: Account,
  opts: InitOptions & StandardClaims = {}
): Promise<CoreAPI> {
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
