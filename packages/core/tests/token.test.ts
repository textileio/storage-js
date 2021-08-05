import { expect } from "chai";
import { decodeURLSafe } from "@stablelib/base64";
import { verify } from "@stablelib/ed25519";
import { createAndSignToken } from "../src/token";
import { createSigner, decode, encode } from "./utils";

describe("core/token", () => {
  const { kid, signer, publicKey } = createSigner();
  test("create basic token", async () => {
    const iss = kid;
    const aud = "audience";
    const alg = "EdDSA";
    const { token } = await createAndSignToken(
      signer,
      { kid, alg },
      { iss, aud }
    );
    expect(typeof token).to.equal("string");
    expect(token).to.contain(".");
  });

  test("jws has correct header", async () => {
    const iss = kid;
    const aud = "audience";
    const { token } = await createAndSignToken(signer, { kid }, { iss, aud });
    const [h] = token.split(".");
    const header = JSON.parse(decode(decodeURLSafe(h)));
    expect(header).to.have.property("alg", "EdDSA"); // Also the default
    expect(header).to.have.property("typ", "JWT");
  });

  test("jws has correct payload", async () => {
    const iss = kid;
    const aud = "audience";
    const { token } = await createAndSignToken(signer, { kid }, { aud, iss });
    const [, p] = token.split(".");
    const payload = JSON.parse(decode(decodeURLSafe(p)));
    expect(payload).to.have.property("iss", kid);
    expect(payload).to.have.property("sub", kid);
    expect(payload).to.have.property("aud", aud);
    const { exp, iat } = payload;
    expect(exp).to.be.greaterThan(iat);
  });

  test("jws supports overriding defaults", async () => {
    const exp = ((d) => new Date(d.setDate(d.getDate() - 1)))(
      new Date()
    ).valueOf();
    const aud = "audience";
    const { token } = await createAndSignToken(signer, { kid }, { exp, aud });
    const [, p] = token.split(".");
    const payload = JSON.parse(decode(decodeURLSafe(p)));
    expect(payload).to.have.property("exp", exp);
  });

  test("jws fails when missing audience or issuer", async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await createAndSignToken(signer, {} as any, {} as any);
      throw new Error("wrong error");
    } catch (err) {
      expect(err.message).to.include("InputError");
    }
  });

  test("jws can be validated", async () => {
    const aud = "audience";
    const { token } = await createAndSignToken(signer, { kid }, { aud });
    const [h, p, s] = token.split(".");
    const message = encode(`${h}.${p}`);
    const signature = decodeURLSafe(s);
    // Use kid to "lookup" the correct key (we just grab it directly for testing purposes)
    // For NEAR this would involve checking to make sure a given account (kid/iss) has the right
    // signing key associated with it: (see https://docs.near.org/docs/api/rpc#view-access-key)
    // For ETH the public key can be extracted from the signed payload and checked against
    // the given kid/iss:
    // (see https://gist.github.com/dcb9/385631846097e1f59e3cba3b1d42f3ed#file-eth_sign_verify-go)
    const ok = verify(publicKey, message, signature);
    expect(ok).to.be.true;
  });
});
