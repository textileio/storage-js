import type { Signer } from "near-api-js";
import { encode as base58btc } from "bs58";
import { createToken, Header, StandardClaims } from "@textile/core-storage";
import { AccountOptions } from "./utils";

/**
 * Create and sign a JWT token to produce a JWS.
 * @param signer A generic Signer interface as specified in `@textile/core-storage`.
 * @param opts A set of configuration options and Standard Claims as specified by the JWT spec.
 * @returns A promise that resolves to a token string.
 */
export async function create(
  signer: Signer,
  { accountId, networkId, ...claims }: AccountOptions & StandardClaims
): Promise<string> {
  // WARN: This is a non-standard JWT
  // Borrows ideas from: https://github.com/ethereum/EIPs/issues/1341
  const publicKey = await signer.getPublicKey(accountId, networkId);
  const encoded = base58btc(publicKey.data);
  const kid = `near:${networkId}:${encoded}`;
  const header: Header = { alg: "NEAR", typ: "JWT", kid };
  const sign = {
    signMessage: async (message: Uint8Array): Promise<Uint8Array> => {
      const sig = await signer.signMessage(message, accountId, networkId);
      return sig.signature;
    },
  };
  const iat = ~~(Date.now() / 1000);
  const exp = iat + 60 * 60; // Default to ~60 minutes
  claims = { iss: accountId, exp, iat, ...claims };
  const { token } = await createToken(sign, header, claims);
  return token;
}
