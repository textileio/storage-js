import type { Signer } from "ethers";
import { utils, BigNumber } from "ethers";
import {
  createAndSignToken,
  Header,
  StandardClaims,
} from "@textile/core-storage";

export async function create(
  signer: Signer,
  { ...claims }: StandardClaims
): Promise<string> {
  // WARN: This is a non-standard JWT
  // Borrows ideas from: https://github.com/ethereum/EIPs/issues/1341
  const address = await signer.getAddress();
  const chainId = signer.provider ? await signer.getChainId() : "unknown";
  const kid = `eth:${chainId}:${address}`;
  const header: Header = { alg: "ETH", typ: "JWT", kid };
  const sign = {
    signMessage: async (message: Uint8Array): Promise<Uint8Array> => {
      const sig = await signer.signMessage(message);
      return utils.arrayify(sig);
    },
  };
  const iat = ~~(Date.now() / 1000);
  const exp = iat + 60 * 60; // Default to ~60 minutes
  claims = { iss: kid, exp, iat, ...claims };
  const { token } = await createAndSignToken(sign, header, claims);
  return token;
}
