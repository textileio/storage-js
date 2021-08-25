import { utils, BigNumber } from "ethers";
export const REGISTRY_ID = "0x7085f413A72dCd53D001eb97971bbf25793262cC";
export const PROVIDER_ID = "0x8845A98EF6580d2a109f8FcfC10cc1d6007059fc";
export const DEPOSIT = estimateDeposit(3600); // ~1hr
export const GAS = 3000000;

/**
 * Estimate the required deposit size in gwei given the session length.
 * @param seconds The requested session length in seconds. Should be an integer value. Is passed
 * through Math.floor before being multiplied by current session multiplier.
 * @returns A BigNumber representation of the required deposit in gwei.
 */
export function estimateDeposit(seconds: number): BigNumber {
  const time = 100 * Math.floor(seconds);
  return utils.parseUnits(time.toString(), "gwei");
}
