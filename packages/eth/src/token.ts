import type { Signer } from "ethers";
import { utils } from "ethers";
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
  const kid = await signer.getAddress();
  const header: Header = { alg: "ETH", typ: "JWT", kid };
  const sign = {
    signMessage: async (message: Uint8Array): Promise<Uint8Array> => {
      const sig = await signer.signMessage(message);
      return utils.arrayify(sig);
    },
  };
  claims = { iss: kid, ...claims };
  const token = await createAndSignToken(sign, header, claims);
  return token;
}
