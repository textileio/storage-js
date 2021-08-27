import { WalletConnection } from "near-api-js";

export const REGISTRY_ID = "storage-bridge-registry.testnet";
export const PROVIDER_ID = "storage-bridge-validator.testnet";
export const DEPOSIT = estimateDeposit(600);
export const GAS = "300000000000000"; // 3e13

export interface AccountOptions {
  // The accountId of the identity to use.
  accountId?: string;
  // The identifier of the network for determining signing keys.
  networkId?: string;
}

/**
 * SignInOptions is a set of options for configuring sign-in.
 */
export interface SignInOptions {
  contractId?: string;
  successUrl?: string;
  failureUrl?: string;
}

/**
 * Request to sign the user into their local browser wallet.
 * @param connection A pre-defined Wallet Connection.
 * @param opts A set of options for controlling callback urls etc.
 * @returns A promise that resolves to true (success) or false.
 */
export async function requestSignIn(
  connection: WalletConnection,
  { successUrl, failureUrl, contractId }: SignInOptions = {}
): Promise<boolean> {
  if (connection.isSignedIn()) return false;
  if (!contractId) contractId = PROVIDER_ID;
  return connection
    .requestSignIn({ contractId, successUrl, failureUrl })
    .then(() => true)
    .catch(() => false);
}

/**
 * Estimate the required deposit size in yocto-NEAR given the session length.
 * @param seconds The requested session length in seconds. Should be an integer value. Is passed
 * through Math.floor before being multiplied by current session multiplier.
 * @returns A string representation of the required deposit in yocto-NEAR.
 */
export function estimateDeposit(seconds: number): string {
  const time = 416000 * Math.floor(seconds);
  return time.toString() + "0".repeat(15);
}
