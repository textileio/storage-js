import type { Signer } from "ethers";
import { utils } from "ethers";
import { createToken, Header, StandardClaims } from "@textile/core-storage";

/**
 * Create and sign a JWT token to produce a JWS.
 * @param signer A generic Signer interface as specified in `@textile/core-storage`.
 * @param claims A set of Standard Claims as specified by the JWT spec.
 * @returns A promise that resolves to a token string.
 */
export async function create(
  signer: Signer,
  claims: StandardClaims
): Promise<string> {
  // WARN: This is a non-standard JWT
  // Borrows ideas from: https://github.com/ethereum/EIPs/issues/1341
  const iss = await signer.getAddress();
  const network = await signer.provider?.getNetwork();
  const chain = network?.chainId ?? "unknown";
  let net = network?.name;
  if (net?.startsWith("matic")) net = "poly";
  else net = "eth";
  const kid = `${net}:${chain}:${iss}`;
  const header: Header = { alg: "ETH", typ: "JWT", kid };
  const sign = {
    signMessage: async (message: Uint8Array): Promise<Uint8Array> => {
      const sig = await signer.signMessage(message);
      return utils.arrayify(sig);
    },
  };
  const iat = ~~(Date.now() / 1000);
  const exp = iat + 60 * 60; // Default to ~60 minutes
  claims = { iss, exp, iat, ...claims };
  const { token } = await createToken(sign, header, claims);
  return token;
}
