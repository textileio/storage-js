import { expect } from "chai";
import { utils } from "ethers";
import { decodeURLSafe } from "@stablelib/base64";
import { MockProvider } from "ethereum-waffle";
import { create } from "../src/token";

const eth = new MockProvider();
const [signer] = eth.getWallets();

const decoder = new TextDecoder();
const decode = decoder.decode.bind(decoder);

const aud = "broker.id";

describe("eth/token", () => {
  test("create basic jws token", async () => {
    const token = await create(signer, { aud });
    expect(typeof token).to.equal("string");
    expect(token).to.contain(".");
  });

  test("jws has correct header", async () => {
    const token = await create(signer, { aud });
    const addr = await signer.getAddress();
    const kid = `eth:1337:${addr}`;
    const [h] = token.split(".");
    const header = JSON.parse(decode(decodeURLSafe(h)));
    expect(header).to.have.property("alg", "ETH");
    expect(header).to.have.property("typ", "JWT");
    expect(header).to.have.property("kid", kid);
  });

  test("jws has correct payload", async () => {
    const addr = await signer.getAddress();
    const token = await create(signer, { aud });
    const [, p] = token.split(".");
    const payload = JSON.parse(decode(decodeURLSafe(p)));
    expect(payload).to.have.property("iss", addr);
    expect(payload).to.have.property("sub", addr);
    expect(payload).to.have.property("aud", aud);
    const { exp, iat } = payload;
    expect(exp).to.be.greaterThan(iat);
  });

  test("jws supports overriding defaults", async () => {
    const yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());
    const token = await create(signer, {
      aud,
      exp: yesterday.valueOf(),
    });
    const [, p] = token.split(".");
    const payload = JSON.parse(decode(decodeURLSafe(p)));
    expect(payload).to.have.property("exp", yesterday.valueOf());
  });

  test("jws can be validated", async () => {
    const token = await create(signer, { aud });
    const [h, p, s] = token.split(".");
    const signature = decodeURLSafe(s);
    const message = `${h}.${p}`;
    const addr = utils.verifyMessage(message, signature);
    expect(addr).to.equal(await signer.getAddress());
  });
});
