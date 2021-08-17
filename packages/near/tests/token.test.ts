import { expect } from "chai";
import { InMemorySigner, keyStores, utils } from "near-api-js";
import { encode as base58btc } from "bs58";
import { decodeURLSafe } from "@stablelib/base64";
import { create } from "../src/token";
import { createHash } from "crypto";
import { verify } from "@stablelib/ed25519";

const decoder = new TextDecoder();
const decode = decoder.decode.bind(decoder);
const encoder = new TextEncoder();
const encode = encoder.encode.bind(encoder);

const signer = new InMemorySigner(new keyStores.InMemoryKeyStore());
const accountId = "account";
const networkId = "localnet";
const aud = "provider";

let publicKey: utils.PublicKey;

describe("near/token", () => {
  beforeAll(async () => {
    publicKey = await signer.createKey(accountId, networkId);
  });

  test("create basic jws token", async () => {
    const token = await create(signer, {
      accountId,
      networkId,
      aud,
    });
    expect(typeof token).to.equal("string");
    expect(token).to.contain(".");
  });

  test("jws has correct header", async () => {
    const token = await create(signer, {
      accountId,
      networkId,
      aud,
    });
    const kid = `${"near:localnet"}:${base58btc(publicKey.data)}`;
    const [h] = token.split(".");
    const header = JSON.parse(decode(decodeURLSafe(h)));
    expect(header).to.have.property("alg", "NEAR");
    expect(header).to.have.property("typ", "JWT");
    expect(header).to.have.property("kid", kid);
  });

  test("jws has correct payload", async () => {
    const token = await create(signer, {
      accountId,
      networkId,
      aud,
    });
    const [, p] = token.split(".");
    const payload = JSON.parse(decode(decodeURLSafe(p)));
    expect(payload).to.have.property("iss", accountId);
    expect(payload).to.have.property("sub", accountId);
    expect(payload).to.have.property("aud", aud);
    const { exp, iat } = payload;
    expect(exp).to.be.greaterThan(iat);
  });

  test("jws supports overriding defaults", async () => {
    const yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());
    const token = await create(signer, {
      accountId,
      networkId,
      aud,
      exp: yesterday.valueOf(),
    });
    const [, p] = token.split(".");
    const payload = JSON.parse(decode(decodeURLSafe(p)));
    expect(payload).to.have.property("exp", yesterday.valueOf());
  });

  test("jws can be validated", async () => {
    const token = await create(signer, { accountId, networkId, aud });
    const [h, p, s] = token.split(".");
    const encoded = encode(`${h}.${p}`);
    const message = createHash("sha256").update(encoded).digest();
    const signature = decodeURLSafe(s);
    const ok = verify(publicKey.data, message, signature);
    expect(ok).to.be.true;
  });
});
