# @textile/storage

[![GitHub license](https://img.shields.io/github/license/textileio/storage-js.svg)](./LICENSE)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/textileio/storage-js.svg)](./package.json)
[![Release](https://img.shields.io/github/release/textileio/storage-js.svg)](https://github.com/textileio/storage-js/releases/latest)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg)](https://github.com/RichardLitt/standard-readme)

![Tests](https://github.com/textileio/storage-js/workflows/Test/badge.svg)
![Release](https://github.com/textileio/storage-js/workflows/Release/badge.svg)

> Javascript/Typescript SDK for Textile's blockchain ↔ Filecoin bridge system

# Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

# Background

**Your bridge to the Filecoin storage ecosystem.**

Textile's `@textile/storage` project provides zero-config Typescript/Javascript SDKs that make it easy to store data on the Filecoin network from any Blockchain-based dApp. `@textile/storage` should feel comfortable to developers already familiar with [NEAR](https://near.org/) and [Ethers](https://docs.ethers.io/) Javascript libraries. The chain-specific SDKs provide small but powerful API surfaces that integrates nicely with existing NEAR/ETH/Polygon development best practices. Simply import the library, deposit some funds, and you are ready to start submitting data to be stored on the Filecoin network. Interested in supporting additional chains and ecosystems? Create an Issue and let us know!

For a great overview of the Filecoin Bridge system, [check out this introductory video](https://www.youtube.com/watch?v=PXbIrzBUpR8), and for chain-specific docs, see https://near.storage/ and/or https://eth.storage/.

# Install

```bash
npm i @textile/near-storage
npm i @textile/eth-storage
```

## Usage

### NEAR

```typescript
import { connect, WalletConnection } from "near-api-js";
import { init } from "@textile/near-storage";

// Defaults to Testnet: https://near.github.io/near-api-js/modules/browserconnect.html
const near = await connect({ ... });

// Need to access wallet
const wallet = new WalletConnection(near, null);
// Request to sign into your amazing near smart-contract!
await wallet.requestSignIn({ contractId: "mycontract.testnet" });

const storage = init(wallet.account());

const blob = new Blob(["Hello, world!"], { type: "text/plain" });
const file = new File([blob], "welcome.txt", {
  type: "text/plain",
  lastModified: new Date().getTime(),
});

await storage.addDeposit();

const { id, cid } = await storage.store(file);

const { request, deals } = await storage.status(id)
console.log(request.status_code)
console.log([...deals])

await wallet.signOut();
```

### ETH/Polygon

```typescript
import { providers } from "ethers";
import { init } from "@textile/eth-storage";

// See also https://docs.metamask.io/guide/rpc-api.html#permissions
await window.ethereum.request({ method: 'eth_requestAccounts' });
const provider = new providers.Web3Provider(window.ethereum);
const wallet = provider.getSigner();

const storage = await init(wallet);

const blob = new Blob(["Hello, world!"], { type: "text/plain" });
const file = new File([blob], "welcome.txt", {
  type: "text/plain",
  lastModified: new Date().getTime(),
});

await storage.addDeposit();

const { id, cid } = await storage.store(file);

const { request, deals } = await storage.status(id);
console.log(request.status_code);
console.log([...deals]);
```

# API

[Full library documentation available on GitHub Pages](https://textileio.github.io/storage-js/)!

Each chain-specific implementation supports a core interface, defined by `@textile/core-storage`. Developers will generally **not** need to import or work directly with `@textile/core-storage`, and instead will import either `@textile/near-storage` or `@textile/eth-storage` (for any EVM compatible chain).

The main entry point for the libraries (`init`) provides an initialization function that takes a NEAR `Account` or an ETH `Signer` object, and returns a `Storage` object with a minimal `CoreAPI` interface. The initialization function can optionally take information about a known Filecoin storage provider, otherwise a provider is automatically selected:

### NEAR

```typescript
import { connect, WalletConnection } from "near-api-js";
import { init, PROVIDER_ID } from "@textile/near-storage";

// See https://github.com/textileio/storage-js-basic-demo/ for a basic demo

// Defaults to Testnet: https://near.github.io/near-api-js/modules/browserconnect.html
const near = await connect({ ... });

// Need to access wallet
const wallet = new WalletConnection(near, null);

// Sign-in and authorize the @textile/near-storage smart contract (or even better, specify your own!)
await wallet.requestSignIn({ contractId: PROIVDER_ID });

// Initialize the storage object, and you're ready to go!
const storage = await init(wallet.account());
```

### ETH/Polygon

```typescript
import { providers } from "ethers";
import { init } from "@textile/eth-storage";

// See https://github.com/textileio/storage-js-dapp-demo for a basic demo

// See also https://docs.metamask.io/guide/rpc-api.html#permissions
await window.ethereum.request({ method: 'eth_requestAccounts' });
const provider = new providers.Web3Provider(window.ethereum);
const wallet = provider.getSigner();

const storage = await init(wallet);
```

## Create session

The core storage API revolves around two key concepts: _deposits_ and _storage_. Leaving a deposit provides a degree of Sybil resistance, such that users looking to store data on Filecoin via the provider must first deposit funds proportional to the length of time they'd like to continue storing data (for testnet, the default timeout is ~10 minutes). To store data, a minimum (default) deposit must be left with a provider:

```typescript
const deposit = await storage.addDeposit();
console.log(deposit);
```

A deposit is generally valid for about 10 minutes (based on blocks) on NEAR, and defaults to 1 hour on ETH/Polygon (to avoid frequent signing). The session duration is a function of the amount of funds deposited. Currently on ETH, this is 100 GWEI per second, or about 0.00036 ETH per hour. On NEAR this is about 0.25 NEAR for a 10 minute session. After funds expire, they can be released by the user or any other party interacting with the SDK's smart contract (such as the provider itself). This provides a means to release funds after a storage session has completed, without locking funds in the contract during the Filecoin proof process.

## Store data

Once a valid deposit is available, the app/user can push data to the provider using the `store` endpoint. This simply takes a `File` (or `FormData`) object, and send the bytes to the provider for preparation and Filecoin storage. In NodeJS, callers can also provide a Readable stream object that contains the FormData bytes (see tests for examples).

```typescript
const blob = new Blob(["Hello, world!"], { type: "text/plain" });
const file = new File([blob], "welcome.txt", {
  type: "text/plain",
  lastModified: new Date().getTime(),
});

// The store API also takes optional configuration parameters
const { id, cid } = await storage.store(file);
```

The response from the `store` method includes the storage request `id`, and the data content id (or `cid`).The app should keep track of at least one of these values for later retrieval. For example, the app might be configured to store a mapping of Account Id to `cid`, to allow users to retrieve their data at a later date. Additionally, the `cid` can be used to fetch the data over IPFS via any public IPFS gateway, or IPFS node, including browser-based nodes. This makes it really easy to reference the data in NFT assets or any other on-chain reference to off-chain data!

## Check status

The status of the file can be queried using its `id`. The storage process ranges from "batching" files together, to "preparing" the storage deal, to "auctioning" the set of storage deals, to the actual "deal making" and "success" of the final storage deal on Filecoin. Along the way, clients may query the status in order to provide feedback to users.

```typescript
const { request, deals } = await storage.status(id);
console.log(request.status_code);
console.log(deals); // Array, empty if no deals on chain yet
```

It is now safe to release the deposit:

```typescript
await storage.releaseDeposit();
```

## Other APIs

The chain-specific SDKs provide a few other endpoints for developers to use, including a [JSON Web Signature (JWS)](https://datatracker.ietf.org/doc/html/rfc7515) signing utility that let's you create a (modified) JWS token.

### NEAR

Here's an example using the `createToken` API from a NodeJS script (assumes you have signed in with [`near login`](https://github.com/near/near-cli)):

```javascript
import { keyStores, InMemorySigner } from "near-api-js";
import os from "os";
import path from "path";
import { createToken } from "@textile/near-storage";

const keyStore = new keyStores.UnencryptedFileSystemKeyStore(
  path.join(os.homedir(), ".near-credentials")
);
const accountId = "account.testnet";
const networkId = "testnet";
const aud = "provider.testnet"; // Intended audience
const signer = new InMemorySigner(keyStore);

const token = await createToken(signer, { accountId, networkId, aud });
```

### ETH/Polygon

Here's an example using the `createToken` API from a browser script (assumes you have Metamask installed):

```javascript
import { providers } from "ethers";
import { createToken } from "@textile/eth-storage";

// See also https://docs.metamask.io/guide/rpc-api.html#permissions
await window.ethereum.request({ method: 'eth_requestAccounts' });
const provider = new providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const aud = "0xaddress"; // Intended audience

const token = await createToken(signer, { aud });
```

### Estimate Deposit

Each chain-specific SDKs provides helper functions for estimating deposit amounts (as well as sane
defaults). For instance, to compute the required deposit for a given chain, you can use the
`estimateDeposit` API:

#### NEAR

```typescript
import { estimateDeposit } from "@textile/near-storage";

// Returns a string
console.log(estimateDeposit(600)); // 600 seconds or 10 minutes
// 249600000000000000000000
```

#### ETH/Polygon

```typescript
import { estimateDeposit } from "@textile/eth-storage";

// Returns a BigNumber
console.log(estimateDeposit(3600).toString()); // 1 hour
// 360000000000000
```

Read the full [API documentation here](https://textileio.github.io/storage-js/).

## Examples

- [Basic React demo app](https://textileio.github.io/storage-js-basic-demo/near/) ([source](https://github.com/textileio/storage-js-basic-demo/tree/main/near))
- More on the way!

# Maintainers

[@carsonfarmer](https://github.com/carsonfarmer)

# Contributing

PRs accepted.

To get started clone this repo, then do:
```bash
# use the latest node and npm LTS
npm install
npm run build

# see if everything is working
npm test
```

Small note: If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

# License

MIT AND Apache-2.0, © 2021 Textile.io
