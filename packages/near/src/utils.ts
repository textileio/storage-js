import { WalletConnection } from "near-api-js";

export const CONTRACT_ID = "filecoin-bridge.testnet";
export const DEPOSIT = "250000000000000000000000";
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
 * @returns A promise.
 */
export async function requestSignIn(
  connection: WalletConnection,
  { successUrl, failureUrl, contractId }: SignInOptions = {}
): Promise<void> {
  if (!contractId) contractId = CONTRACT_ID;
  return connection.requestSignIn({ contractId, successUrl, failureUrl });
}
