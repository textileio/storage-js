/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ConnectedWalletAccount,
  Near,
  Account,
  keyStores,
  InMemorySigner,
  WalletConnection,
} from "near-api-js";
import { encodeURLSafe } from "@stablelib/base64";

import { DEPOSIT } from "../src/utils";

const decoder = new TextDecoder();
export const decode = decoder.decode.bind(decoder);
const encoder = new TextEncoder();
export const encode = encoder.encode.bind(encoder);

interface FunctionCallOptions {
  /** The NEAR account id where the contract is deployed */
  contractId: string;
  /** The name of the method to invoke */
  methodName: string;
  /** named arguments to pass the method `{ messageText: 'my message' }` */
  args: any;
  /** max amount of gas that method call can use */
  gas?: string;
  /** amount of NEAR (in yoctoNEAR) to send together with the call */
  attachedDeposit?: string;
}

const mockNear = (keyStore: keyStores.KeyStore) =>
  ({
    config: {
      networkId: "networkId",
      contractName: "contractId",
      walletUrl: "http://example.com/wallet",
    },
    connection: {
      networkId: "networkId",
      signer: new InMemorySigner(keyStore),
    },
    async account(accountId: string) {
      return {
        async state() {
          // noop
        },
        accountId,
      } as unknown as Account;
    },
  } as unknown as Near);

export const mocks = {
  Provider: (
    keyStore: keyStores.KeyStore,
    accountId = ""
  ): WalletConnection => {
    const fakeNear = mockNear(keyStore);
    const deposits: Map<string, any> = new Map();
    const walletConnection = new WalletConnection(fakeNear, "fake_app");
    const _connectedAccount = {
      connection: fakeNear.connection,
      accountId,
      async viewFunction(contractId: string, methodName: string, args: any) {
        switch (methodName) {
          case "hasDeposit": {
            const { account } = args;
            return deposits.has(account);
          }
          case "apiEndpoint": {
            return "https://provider.io";
          }
          default:
            return;
        }
      },
      async functionCall({
        methodName,
        args = {},
        attachedDeposit = DEPOSIT,
      }: FunctionCallOptions) {
        switch (methodName) {
          case "addDeposit": {
            const { account } = args;
            // TODO: Make sure we aren't actually expecting a BigInt value for amount here?
            if (attachedDeposit !== DEPOSIT)
              throw new Error("addDeposit: invalid attached deposit");
            const info = {
              sender: "",
              account,
              amount: attachedDeposit,
            };
            deposits.set(account, attachedDeposit);
            const SuccessValue = encodeURLSafe(encode(JSON.stringify(info)));
            return { status: { SuccessValue } };
          }
          case "releaseDeposits": {
            const SuccessValue = encodeURLSafe(encode(""));
            deposits.clear();
            return { status: { SuccessValue } };
          }
          case "releaseDeposit": {
            const { account } = args;
            // TODO: Make sure this is the right response!
            if (!deposits.has(account)) {
              throw new Error("releaseDeposit: funds not locked");
            }
            deposits.delete(account);
            const info = {
              sender: "",
              account,
              amount: deposits.get(account),
            };
            const SuccessValue = encodeURLSafe(encode(JSON.stringify(info)));
            return { status: { SuccessValue } };
          }
          default:
            return {} as any;
        }
      },
    } as unknown as ConnectedWalletAccount;
    walletConnection._connectedAccount = _connectedAccount;
    return walletConnection;
  },
  Registry: (
    keyStore: keyStores.KeyStore,
    accountId = ""
  ): WalletConnection => {
    const fakeNear = mockNear(keyStore);

    const walletConnection = new WalletConnection(fakeNear, "fake_app");
    const providers = ["provider.id"];
    const _connectedAccount = {
      connection: fakeNear.connection,
      accountId,
      async viewFunction(_contractId: string, methodName: string) {
        switch (methodName) {
          case "listProviders": {
            return providers;
          }
          default:
            return;
        }
      },
    } as unknown as ConnectedWalletAccount;
    walletConnection._connectedAccount = _connectedAccount;
    return walletConnection;
  },
};
