import { expect } from "chai";
import { utils, providers } from "ethers";
import { MockProvider } from "ethereum-waffle";
import { estimateDeposit, requestSignIn } from "../src/utils";

const p = new MockProvider() as unknown as providers.ExternalProvider;
globalThis.window = globalThis as Window & typeof globalThis;
window.ethereum = p;
window.removeEventListener = () => undefined;

describe("eth/utils", () => {
  // Skip for now because MockProvider doesn't support request or the eth_requestAccounts method
  test.skip("requestSignIn", async () => {
    expect(await requestSignIn()).to.be.false;
    expect(window.ethereum).to.equal(p);
  });

  test("estimateDeposit", () => {
    // ~ 360000 gwei or 0.00036 for about 1hr
    const expected = utils.parseUnits("360000", "gwei");
    const observed = estimateDeposit(3600);
    expect(expected.toString()).to.equal(observed.toString());
    const ten = utils.parseUnits("1000", "gwei");
    expect(estimateDeposit(10.1).toString()).to.equal(ten.toString());
  });
});
