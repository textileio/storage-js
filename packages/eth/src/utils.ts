import { utils, BigNumber, providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
export const REGISTRY_ID = "0x7085f413A72dCd53D001eb97971bbf25793262cC";
export const PROVIDER_ID = "0x8845A98EF6580d2a109f8FcfC10cc1d6007059fc";
export const DEPOSIT = estimateDeposit(3600); // ~1hr
export const GAS = 3000000;

/**
 * Request to connect to a EIP-1102 and EIP-1193 compliant Ethereum provider.
 * @returns A promise that resolves to true (success) or false.
 */
export async function requestSignIn(): Promise<boolean> {
  const provider =
    (await detectEthereumProvider()) as providers.ExternalProvider;
  if (provider && provider.request) {
    await provider.request({
      method: "eth_requestAccounts",
    });
    return true;
  }
  return false;
}

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
