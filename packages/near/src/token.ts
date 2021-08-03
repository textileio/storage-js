import type { Signer } from "near-api-js";
import { encode as base58btc } from "bs58";
import {
  createAndSignToken,
  Header,
  StandardClaims,
} from "@textile/core-storage";
import { AccountOptions } from "./utils";

export function encodeKey(publicKey: Uint8Array): string {
  // Compute multi-base encoded key id as per:
  // w3c-ccg.github.io/did-method-key/#format
  const buffer = new Uint8Array(2 + publicKey.byteLength);
  buffer[0] = 0xed; // Using ed25519
  buffer[1] = 0x01;
  buffer.set(publicKey, 2);
  // prefix with `z` to indicate multi-base base58btc encoding
  const kid = `z${base58btc(buffer)}`;
  return kid;
}

export async function create(
  signer: Signer,
  { accountId, networkId, ...claims }: AccountOptions & StandardClaims
): Promise<string> {
  // WARN: This is a non-standard JWT
  // Borrows ideas from: https://github.com/ethereum/EIPs/issues/1341
  const publicKey = await signer.getPublicKey(accountId, networkId);
  const kid = encodeKey(publicKey.data);
  const header: Header = { alg: "NEAR", typ: "JWT", kid };
  const sign = {
    signMessage: async (message: Uint8Array): Promise<Uint8Array> => {
      const sig = await signer.signMessage(message, accountId, networkId);
      return sig.signature;
    },
  };
  claims = { iss: kid, sub: accountId, ...claims };
  const token = await createAndSignToken(sign, header, claims);
  return token;
}
