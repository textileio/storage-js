import { expect } from "chai";
import { utils } from "ethers";
import { estimateDeposit } from "../src/utils";

describe("eth/utils", () => {
  test("estimateDeposit", () => {
    // ~ 360000 gwei or 0.00036 for about 1hr
    const expected = utils.parseUnits("360000", "gwei");
    const observed = estimateDeposit(3600);
    expect(expected.toString()).to.equal(observed.toString());
    const ten = utils.parseUnits("1000", "gwei");
    expect(estimateDeposit(10.1).toString()).to.equal(ten.toString());
  });
});
