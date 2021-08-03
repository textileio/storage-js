import { generateKeyPair, sign } from "@stablelib/ed25519";
import { encode as base58btc } from "bs58";
import { Signer } from "../src/token";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createSigner() {
  const { publicKey, secretKey } = generateKeyPair();

  // Compute multi-base encoded key id as per:
  // w3c-ccg.github.io/did-method-key/#format
  const buffer = new Uint8Array(2 + publicKey.byteLength);
  buffer[0] = 0xed; // Using ed25519
  buffer[1] = 0x01;
  buffer.set(publicKey, 2);
  // prefix with `z` to indicate multi-base base58btc encoding
  const kid = `z${base58btc(buffer)}`;

  // Basic ed25519 signer implementation
  const signer: Signer = {
    signMessage: async (message) => sign(secretKey, message),
  };
  return { kid, signer, publicKey, secretKey };
}

const decoder = new TextDecoder();
export const decode = decoder.decode.bind(decoder);
const encoder = new TextEncoder();
export const encode = encoder.encode.bind(encoder);
