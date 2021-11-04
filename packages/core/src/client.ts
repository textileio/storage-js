import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { GraphQLError } from 'graphql-request/dist/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
};

export type Auction = Node & {
  __typename?: 'Auction';
  /** Reads and enables pagination through a set of `Bid`. */
  bidsByAuctionId: BidsConnection;
  carIpfsAddrs: Array<Maybe<Scalars['String']>>;
  carIpfsCid: Scalars['String'];
  carUrl: Scalars['String'];
  clientAddress: Scalars['String'];
  dealDuration: Scalars['BigInt'];
  dealReplication: Scalars['Int'];
  dealSize: Scalars['BigInt'];
  dealVerified: Scalars['Boolean'];
  /** Reads and enables pagination through a set of `Deal`. */
  dealsByAuctionId: DealsConnection;
  duration: Scalars['BigInt'];
  errorCause: Scalars['String'];
  excludedStorageProviders: Array<Maybe<Scalars['String']>>;
  filEpochDeadline: Scalars['BigInt'];
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  payloadCid: Scalars['String'];
  providers?: Maybe<Array<Maybe<Scalars['String']>>>;
  startedAt: Scalars['Datetime'];
  status: Scalars['String'];
  /** Reads a single `StoragePayload` that is related to this `Auction`. */
  storagePayloadByStoragePayloadId?: Maybe<StoragePayload>;
  storagePayloadId: Scalars['String'];
  updatedAt: Scalars['Datetime'];
};


export type AuctionBidsByAuctionIdArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<BidCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BidsOrderBy>>;
};


export type AuctionDealsByAuctionIdArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<DealCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<DealsOrderBy>>;
};

/** A condition to be used against `Auction` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AuctionCondition = {
  /** Checks for equality with the object’s `carIpfsAddrs` field. */
  carIpfsAddrs?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `carIpfsCid` field. */
  carIpfsCid?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `carUrl` field. */
  carUrl?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `clientAddress` field. */
  clientAddress?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `dealDuration` field. */
  dealDuration?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `dealReplication` field. */
  dealReplication?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `dealSize` field. */
  dealSize?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `dealVerified` field. */
  dealVerified?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `duration` field. */
  duration?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `errorCause` field. */
  errorCause?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `excludedStorageProviders` field. */
  excludedStorageProviders?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `filEpochDeadline` field. */
  filEpochDeadline?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `payloadCid` field. */
  payloadCid?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `providers` field. */
  providers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `startedAt` field. */
  startedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `storagePayloadId` field. */
  storagePayloadId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `Auction` values. */
export type AuctionsConnection = {
  __typename?: 'AuctionsConnection';
  /** A list of edges which contains the `Auction` and cursor to aid in pagination. */
  edges: Array<AuctionsEdge>;
  /** A list of `Auction` objects. */
  nodes: Array<Auction>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Auction` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Auction` edge in the connection. */
export type AuctionsEdge = {
  __typename?: 'AuctionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Auction` at the end of the edge. */
  node: Auction;
};

/** Methods to use when ordering `Auction`. */
export enum AuctionsOrderBy {
  CarIpfsAddrsAsc = 'CAR_IPFS_ADDRS_ASC',
  CarIpfsAddrsDesc = 'CAR_IPFS_ADDRS_DESC',
  CarIpfsCidAsc = 'CAR_IPFS_CID_ASC',
  CarIpfsCidDesc = 'CAR_IPFS_CID_DESC',
  CarUrlAsc = 'CAR_URL_ASC',
  CarUrlDesc = 'CAR_URL_DESC',
  ClientAddressAsc = 'CLIENT_ADDRESS_ASC',
  ClientAddressDesc = 'CLIENT_ADDRESS_DESC',
  DealDurationAsc = 'DEAL_DURATION_ASC',
  DealDurationDesc = 'DEAL_DURATION_DESC',
  DealReplicationAsc = 'DEAL_REPLICATION_ASC',
  DealReplicationDesc = 'DEAL_REPLICATION_DESC',
  DealSizeAsc = 'DEAL_SIZE_ASC',
  DealSizeDesc = 'DEAL_SIZE_DESC',
  DealVerifiedAsc = 'DEAL_VERIFIED_ASC',
  DealVerifiedDesc = 'DEAL_VERIFIED_DESC',
  DurationAsc = 'DURATION_ASC',
  DurationDesc = 'DURATION_DESC',
  ErrorCauseAsc = 'ERROR_CAUSE_ASC',
  ErrorCauseDesc = 'ERROR_CAUSE_DESC',
  ExcludedStorageProvidersAsc = 'EXCLUDED_STORAGE_PROVIDERS_ASC',
  ExcludedStorageProvidersDesc = 'EXCLUDED_STORAGE_PROVIDERS_DESC',
  FilEpochDeadlineAsc = 'FIL_EPOCH_DEADLINE_ASC',
  FilEpochDeadlineDesc = 'FIL_EPOCH_DEADLINE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PayloadCidAsc = 'PAYLOAD_CID_ASC',
  PayloadCidDesc = 'PAYLOAD_CID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProvidersAsc = 'PROVIDERS_ASC',
  ProvidersDesc = 'PROVIDERS_DESC',
  StartedAtAsc = 'STARTED_AT_ASC',
  StartedAtDesc = 'STARTED_AT_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  StoragePayloadIdAsc = 'STORAGE_PAYLOAD_ID_ASC',
  StoragePayloadIdDesc = 'STORAGE_PAYLOAD_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type Batch = Node & {
  __typename?: 'Batch';
  createdAt: Scalars['Datetime'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  origin: Scalars['String'];
  /** Reads a single `PieceInfo` that is related to this `Batch`. */
  pieceInfoByBatchId?: Maybe<PieceInfo>;
  readyAt: Scalars['Datetime'];
  status: BatchStatus;
  /** Reads a single `StoragePayload` that is related to this `Batch`. */
  storagePayloadByStoragePayloadId?: Maybe<StoragePayload>;
  storagePayloadId: Scalars['String'];
  /** Reads and enables pagination through a set of `StorageRequest`. */
  storageRequestsByStoragePayloadId: StorageRequestsConnection;
  totalSize: Scalars['BigInt'];
  updatedAt: Scalars['Datetime'];
};


export type BatchStorageRequestsByStoragePayloadIdArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<StorageRequestCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StorageRequestsOrderBy>>;
};

/** A condition to be used against `Batch` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BatchCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `origin` field. */
  origin?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `readyAt` field. */
  readyAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<BatchStatus>;
  /** Checks for equality with the object’s `storagePayloadId` field. */
  storagePayloadId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `totalSize` field. */
  totalSize?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
};

export enum BatchStatus {
  Done = 'DONE',
  Executing = 'EXECUTING',
  Open = 'OPEN',
  Ready = 'READY'
}

/** A connection to a list of `Batch` values. */
export type BatchesConnection = {
  __typename?: 'BatchesConnection';
  /** A list of edges which contains the `Batch` and cursor to aid in pagination. */
  edges: Array<BatchesEdge>;
  /** A list of `Batch` objects. */
  nodes: Array<Batch>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Batch` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Batch` edge in the connection. */
export type BatchesEdge = {
  __typename?: 'BatchesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Batch` at the end of the edge. */
  node: Batch;
};

/** Methods to use when ordering `Batch`. */
export enum BatchesOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  OriginAsc = 'ORIGIN_ASC',
  OriginDesc = 'ORIGIN_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReadyAtAsc = 'READY_AT_ASC',
  ReadyAtDesc = 'READY_AT_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  StoragePayloadIdAsc = 'STORAGE_PAYLOAD_ID_ASC',
  StoragePayloadIdDesc = 'STORAGE_PAYLOAD_ID_DESC',
  TotalSizeAsc = 'TOTAL_SIZE_ASC',
  TotalSizeDesc = 'TOTAL_SIZE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type Bid = Node & {
  __typename?: 'Bid';
  askPrice: Scalars['BigInt'];
  /** Reads a single `Auction` that is related to this `Bid`. */
  auctionByAuctionId?: Maybe<Auction>;
  auctionId: Scalars['String'];
  /** Reads and enables pagination through a set of `BidEvent`. */
  bidEventsByBidId: BidEventsConnection;
  bidderId: Scalars['String'];
  /** Reads a single `Deal` that is related to this `Bid`. */
  dealByBidId?: Maybe<Deal>;
  dealConfirmedAt?: Maybe<Scalars['Datetime']>;
  dealFailedAt?: Maybe<Scalars['Datetime']>;
  fastRetrieval: Scalars['Boolean'];
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  proposalCid?: Maybe<Scalars['String']>;
  proposalCidDeliveredAt?: Maybe<Scalars['Datetime']>;
  proposalCidDeliveryError?: Maybe<Scalars['String']>;
  receivedAt: Scalars['Datetime'];
  startEpoch: Scalars['BigInt'];
  /** Reads a single `StorageProvider` that is related to this `Bid`. */
  storageProviderByStorageProviderId?: Maybe<StorageProvider>;
  storageProviderId: Scalars['String'];
  verifiedAskPrice: Scalars['BigInt'];
  wonAt?: Maybe<Scalars['Datetime']>;
  wonReason?: Maybe<Scalars['String']>;
};


export type BidBidEventsByBidIdArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<BidEventCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BidEventsOrderBy>>;
};

/** A condition to be used against `Bid` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BidCondition = {
  /** Checks for equality with the object’s `askPrice` field. */
  askPrice?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `auctionId` field. */
  auctionId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `bidderId` field. */
  bidderId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `dealConfirmedAt` field. */
  dealConfirmedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `dealFailedAt` field. */
  dealFailedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `fastRetrieval` field. */
  fastRetrieval?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `proposalCid` field. */
  proposalCid?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `proposalCidDeliveredAt` field. */
  proposalCidDeliveredAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `proposalCidDeliveryError` field. */
  proposalCidDeliveryError?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `receivedAt` field. */
  receivedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `startEpoch` field. */
  startEpoch?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `storageProviderId` field. */
  storageProviderId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `verifiedAskPrice` field. */
  verifiedAskPrice?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `wonAt` field. */
  wonAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `wonReason` field. */
  wonReason?: Maybe<Scalars['String']>;
};

export type BidEvent = {
  __typename?: 'BidEvent';
  attempts?: Maybe<Scalars['Int']>;
  /** Reads a single `Bid` that is related to this `BidEvent`. */
  bidByBidId?: Maybe<Bid>;
  bidId: Scalars['String'];
  error?: Maybe<Scalars['String']>;
  eventType: BidEventType;
  happenedAt: Scalars['Datetime'];
  receivedAt: Scalars['Datetime'];
};

/**
 * A condition to be used against `BidEvent` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type BidEventCondition = {
  /** Checks for equality with the object’s `attempts` field. */
  attempts?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `bidId` field. */
  bidId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `error` field. */
  error?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `eventType` field. */
  eventType?: Maybe<BidEventType>;
  /** Checks for equality with the object’s `happenedAt` field. */
  happenedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `receivedAt` field. */
  receivedAt?: Maybe<Scalars['Datetime']>;
};

export enum BidEventType {
  EndImporting = 'END_IMPORTING',
  Errored = 'ERRORED',
  ErrorFetching = 'ERROR_FETCHING',
  Finalized = 'FINALIZED',
  StartFetching = 'START_FETCHING',
  StartImporting = 'START_IMPORTING'
}

/** A connection to a list of `BidEvent` values. */
export type BidEventsConnection = {
  __typename?: 'BidEventsConnection';
  /** A list of edges which contains the `BidEvent` and cursor to aid in pagination. */
  edges: Array<BidEventsEdge>;
  /** A list of `BidEvent` objects. */
  nodes: Array<BidEvent>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BidEvent` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `BidEvent` edge in the connection. */
export type BidEventsEdge = {
  __typename?: 'BidEventsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `BidEvent` at the end of the edge. */
  node: BidEvent;
};

/** Methods to use when ordering `BidEvent`. */
export enum BidEventsOrderBy {
  AttemptsAsc = 'ATTEMPTS_ASC',
  AttemptsDesc = 'ATTEMPTS_DESC',
  BidIdAsc = 'BID_ID_ASC',
  BidIdDesc = 'BID_ID_DESC',
  ErrorAsc = 'ERROR_ASC',
  ErrorDesc = 'ERROR_DESC',
  EventTypeAsc = 'EVENT_TYPE_ASC',
  EventTypeDesc = 'EVENT_TYPE_DESC',
  HappenedAtAsc = 'HAPPENED_AT_ASC',
  HappenedAtDesc = 'HAPPENED_AT_DESC',
  Natural = 'NATURAL',
  ReceivedAtAsc = 'RECEIVED_AT_ASC',
  ReceivedAtDesc = 'RECEIVED_AT_DESC'
}

/** A connection to a list of `Bid` values. */
export type BidsConnection = {
  __typename?: 'BidsConnection';
  /** A list of edges which contains the `Bid` and cursor to aid in pagination. */
  edges: Array<BidsEdge>;
  /** A list of `Bid` objects. */
  nodes: Array<Bid>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Bid` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Bid` edge in the connection. */
export type BidsEdge = {
  __typename?: 'BidsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Bid` at the end of the edge. */
  node: Bid;
};

/** Methods to use when ordering `Bid`. */
export enum BidsOrderBy {
  AskPriceAsc = 'ASK_PRICE_ASC',
  AskPriceDesc = 'ASK_PRICE_DESC',
  AuctionIdAsc = 'AUCTION_ID_ASC',
  AuctionIdDesc = 'AUCTION_ID_DESC',
  BidderIdAsc = 'BIDDER_ID_ASC',
  BidderIdDesc = 'BIDDER_ID_DESC',
  DealConfirmedAtAsc = 'DEAL_CONFIRMED_AT_ASC',
  DealConfirmedAtDesc = 'DEAL_CONFIRMED_AT_DESC',
  DealFailedAtAsc = 'DEAL_FAILED_AT_ASC',
  DealFailedAtDesc = 'DEAL_FAILED_AT_DESC',
  FastRetrievalAsc = 'FAST_RETRIEVAL_ASC',
  FastRetrievalDesc = 'FAST_RETRIEVAL_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProposalCidAsc = 'PROPOSAL_CID_ASC',
  ProposalCidDeliveredAtAsc = 'PROPOSAL_CID_DELIVERED_AT_ASC',
  ProposalCidDeliveredAtDesc = 'PROPOSAL_CID_DELIVERED_AT_DESC',
  ProposalCidDeliveryErrorAsc = 'PROPOSAL_CID_DELIVERY_ERROR_ASC',
  ProposalCidDeliveryErrorDesc = 'PROPOSAL_CID_DELIVERY_ERROR_DESC',
  ProposalCidDesc = 'PROPOSAL_CID_DESC',
  ReceivedAtAsc = 'RECEIVED_AT_ASC',
  ReceivedAtDesc = 'RECEIVED_AT_DESC',
  StartEpochAsc = 'START_EPOCH_ASC',
  StartEpochDesc = 'START_EPOCH_DESC',
  StorageProviderIdAsc = 'STORAGE_PROVIDER_ID_ASC',
  StorageProviderIdDesc = 'STORAGE_PROVIDER_ID_DESC',
  VerifiedAskPriceAsc = 'VERIFIED_ASK_PRICE_ASC',
  VerifiedAskPriceDesc = 'VERIFIED_ASK_PRICE_DESC',
  WonAtAsc = 'WON_AT_ASC',
  WonAtDesc = 'WON_AT_DESC',
  WonReasonAsc = 'WON_REASON_ASC',
  WonReasonDesc = 'WON_REASON_DESC'
}

export type CompetitionResult = {
  __typename?: 'CompetitionResult';
  auctionsWon?: Maybe<Scalars['BigInt']>;
  decayingFailureRate?: Maybe<Scalars['Float']>;
  failedDeals?: Maybe<Scalars['BigInt']>;
  failureRate?: Maybe<Scalars['Float']>;
  gibs?: Maybe<Scalars['Float']>;
  qualified?: Maybe<Scalars['Boolean']>;
  storageProviderId?: Maybe<Scalars['String']>;
};

/**
 * A condition to be used against `CompetitionResult` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CompetitionResultCondition = {
  /** Checks for equality with the object’s `auctionsWon` field. */
  auctionsWon?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `decayingFailureRate` field. */
  decayingFailureRate?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `failedDeals` field. */
  failedDeals?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `failureRate` field. */
  failureRate?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `gibs` field. */
  gibs?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `qualified` field. */
  qualified?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `storageProviderId` field. */
  storageProviderId?: Maybe<Scalars['String']>;
};

/** A connection to a list of `CompetitionResult` values. */
export type CompetitionResultsConnection = {
  __typename?: 'CompetitionResultsConnection';
  /** A list of edges which contains the `CompetitionResult` and cursor to aid in pagination. */
  edges: Array<CompetitionResultsEdge>;
  /** A list of `CompetitionResult` objects. */
  nodes: Array<CompetitionResult>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CompetitionResult` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CompetitionResult` edge in the connection. */
export type CompetitionResultsEdge = {
  __typename?: 'CompetitionResultsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CompetitionResult` at the end of the edge. */
  node: CompetitionResult;
};

/** Methods to use when ordering `CompetitionResult`. */
export enum CompetitionResultsOrderBy {
  AuctionsWonAsc = 'AUCTIONS_WON_ASC',
  AuctionsWonDesc = 'AUCTIONS_WON_DESC',
  DecayingFailureRateAsc = 'DECAYING_FAILURE_RATE_ASC',
  DecayingFailureRateDesc = 'DECAYING_FAILURE_RATE_DESC',
  FailedDealsAsc = 'FAILED_DEALS_ASC',
  FailedDealsDesc = 'FAILED_DEALS_DESC',
  FailureRateAsc = 'FAILURE_RATE_ASC',
  FailureRateDesc = 'FAILURE_RATE_DESC',
  GibsAsc = 'GIBS_ASC',
  GibsDesc = 'GIBS_DESC',
  Natural = 'NATURAL',
  QualifiedAsc = 'QUALIFIED_ASC',
  QualifiedDesc = 'QUALIFIED_DESC',
  StorageProviderIdAsc = 'STORAGE_PROVIDER_ID_ASC',
  StorageProviderIdDesc = 'STORAGE_PROVIDER_ID_DESC'
}

export type Deal = Node & {
  __typename?: 'Deal';
  /** Reads a single `Auction` that is related to this `Deal`. */
  auctionByAuctionId?: Maybe<Auction>;
  auctionId: Scalars['String'];
  /** Reads a single `Bid` that is related to this `Deal`. */
  bidByBidId?: Maybe<Bid>;
  bidId: Scalars['String'];
  createdAt: Scalars['Datetime'];
  dealExpiration: Scalars['BigInt'];
  dealId: Scalars['BigInt'];
  errorCause: Scalars['String'];
  executing: Scalars['Boolean'];
  fastRetrieval: Scalars['Boolean'];
  marketDealStatus: MarketDealStatus;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  pricePerGibPerEpoch: Scalars['BigInt'];
  proposalCid: Scalars['String'];
  readyAt: Scalars['Datetime'];
  retries: Scalars['Int'];
  startEpoch: Scalars['BigInt'];
  status: Status;
  /** Reads a single `StoragePayload` that is related to this `Deal`. */
  storagePayloadByStoragePayloadId?: Maybe<StoragePayload>;
  storagePayloadId: Scalars['String'];
  /** Reads a single `StorageProvider` that is related to this `Deal`. */
  storageProviderByStorageProviderId?: Maybe<StorageProvider>;
  storageProviderId: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  verified: Scalars['Boolean'];
};

/** A condition to be used against `Deal` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type DealCondition = {
  /** Checks for equality with the object’s `auctionId` field. */
  auctionId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `bidId` field. */
  bidId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `dealExpiration` field. */
  dealExpiration?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `dealId` field. */
  dealId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `errorCause` field. */
  errorCause?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `executing` field. */
  executing?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `fastRetrieval` field. */
  fastRetrieval?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `marketDealStatus` field. */
  marketDealStatus?: Maybe<MarketDealStatus>;
  /** Checks for equality with the object’s `pricePerGibPerEpoch` field. */
  pricePerGibPerEpoch?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `proposalCid` field. */
  proposalCid?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `readyAt` field. */
  readyAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `retries` field. */
  retries?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `startEpoch` field. */
  startEpoch?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<Status>;
  /** Checks for equality with the object’s `storagePayloadId` field. */
  storagePayloadId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `storageProviderId` field. */
  storageProviderId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `verified` field. */
  verified?: Maybe<Scalars['Boolean']>;
};

/** A connection to a list of `Deal` values. */
export type DealsConnection = {
  __typename?: 'DealsConnection';
  /** A list of edges which contains the `Deal` and cursor to aid in pagination. */
  edges: Array<DealsEdge>;
  /** A list of `Deal` objects. */
  nodes: Array<Deal>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Deal` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Deal` edge in the connection. */
export type DealsEdge = {
  __typename?: 'DealsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Deal` at the end of the edge. */
  node: Deal;
};

/** Methods to use when ordering `Deal`. */
export enum DealsOrderBy {
  AuctionIdAsc = 'AUCTION_ID_ASC',
  AuctionIdDesc = 'AUCTION_ID_DESC',
  BidIdAsc = 'BID_ID_ASC',
  BidIdDesc = 'BID_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DealExpirationAsc = 'DEAL_EXPIRATION_ASC',
  DealExpirationDesc = 'DEAL_EXPIRATION_DESC',
  DealIdAsc = 'DEAL_ID_ASC',
  DealIdDesc = 'DEAL_ID_DESC',
  ErrorCauseAsc = 'ERROR_CAUSE_ASC',
  ErrorCauseDesc = 'ERROR_CAUSE_DESC',
  ExecutingAsc = 'EXECUTING_ASC',
  ExecutingDesc = 'EXECUTING_DESC',
  FastRetrievalAsc = 'FAST_RETRIEVAL_ASC',
  FastRetrievalDesc = 'FAST_RETRIEVAL_DESC',
  MarketDealStatusAsc = 'MARKET_DEAL_STATUS_ASC',
  MarketDealStatusDesc = 'MARKET_DEAL_STATUS_DESC',
  Natural = 'NATURAL',
  PricePerGibPerEpochAsc = 'PRICE_PER_GIB_PER_EPOCH_ASC',
  PricePerGibPerEpochDesc = 'PRICE_PER_GIB_PER_EPOCH_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProposalCidAsc = 'PROPOSAL_CID_ASC',
  ProposalCidDesc = 'PROPOSAL_CID_DESC',
  ReadyAtAsc = 'READY_AT_ASC',
  ReadyAtDesc = 'READY_AT_DESC',
  RetriesAsc = 'RETRIES_ASC',
  RetriesDesc = 'RETRIES_DESC',
  StartEpochAsc = 'START_EPOCH_ASC',
  StartEpochDesc = 'START_EPOCH_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  StoragePayloadIdAsc = 'STORAGE_PAYLOAD_ID_ASC',
  StoragePayloadIdDesc = 'STORAGE_PAYLOAD_ID_DESC',
  StorageProviderIdAsc = 'STORAGE_PROVIDER_ID_ASC',
  StorageProviderIdDesc = 'STORAGE_PROVIDER_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  VerifiedAsc = 'VERIFIED_ASC',
  VerifiedDesc = 'VERIFIED_DESC'
}

export enum MarketDealStatus {
  /** Accept wait */
  AcceptWait = 'ACCEPT_WAIT',
  /** Active */
  Active = 'ACTIVE',
  /** Awaiting a PreCommit message on chain */
  AwaitingAPrecommitMessageOnChain = 'AWAITING_A_PRECOMMIT_MESSAGE_ON_CHAIN',
  /** Checking for deal acceptance */
  CheckingForDealAcceptance = 'CHECKING_FOR_DEAL_ACCEPTANCE',
  /** Client funding */
  ClientFunding = 'CLIENT_FUNDING',
  /** Client transfer restart */
  ClientTransferRestart = 'CLIENT_TRANSFER_RESTART',
  /** Error */
  Error = 'ERROR',
  /** Expired */
  Expired = 'EXPIRED',
  /** Failing */
  Failing = 'FAILING',
  /** Finalizing */
  Finalizing = 'FINALIZING',
  /** Funds reserved */
  FundsReserved = 'FUNDS_RESERVED',
  /** Proposal accepted */
  ProposalAccepted = 'PROPOSAL_ACCEPTED',
  /** Proposal not found */
  ProposalNotFound = 'PROPOSAL_NOT_FOUND',
  /** Proposal rejected */
  ProposalRejected = 'PROPOSAL_REJECTED',
  /** Provider funding */
  ProviderFunding = 'PROVIDER_FUNDING',
  /** Provider transfer await restart */
  ProviderTransferAwaitRestart = 'PROVIDER_TRANSFER_AWAIT_RESTART',
  /** Publish */
  Publish = 'PUBLISH',
  /** Publishing */
  Publishing = 'PUBLISHING',
  /** Rejecting */
  Rejecting = 'REJECTING',
  /** Reserving client funds */
  ReservingClientFunds = 'RESERVING_CLIENT_FUNDS',
  /** Reserving provider funds */
  ReservingProviderFunds = 'RESERVING_PROVIDER_FUNDS',
  /** Sealing */
  Sealing = 'SEALING',
  /** Slashed */
  Slashed = 'SLASHED',
  /** Staged */
  Staged = 'STAGED',
  /** Starting data transfer */
  StartingDataTransfer = 'STARTING_DATA_TRANSFER',
  /** Transferring */
  Transferring = 'TRANSFERRING',
  /** Unknown */
  Unknown = 'UNKNOWN',
  /** Validating */
  Validating = 'VALIDATING',
  /** Verifying data */
  VerifyingData = 'VERIFYING_DATA',
  /** Waiting for data */
  WaitingForData = 'WAITING_FOR_DATA'
}

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

export type PieceInfo = Node & {
  __typename?: 'PieceInfo';
  /** Reads a single `Batch` that is related to this `PieceInfo`. */
  batchByBatchId?: Maybe<Batch>;
  batchId: Scalars['String'];
  createdAt: Scalars['Datetime'];
  dataCid: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  readyAt: Scalars['Datetime'];
  status: UnpreparedBatchStatus;
  updatedAt: Scalars['Datetime'];
};

/**
 * A condition to be used against `PieceInfo` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PieceInfoCondition = {
  /** Checks for equality with the object’s `batchId` field. */
  batchId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `dataCid` field. */
  dataCid?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `readyAt` field. */
  readyAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<UnpreparedBatchStatus>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `PieceInfo` values. */
export type PieceInfosConnection = {
  __typename?: 'PieceInfosConnection';
  /** A list of edges which contains the `PieceInfo` and cursor to aid in pagination. */
  edges: Array<PieceInfosEdge>;
  /** A list of `PieceInfo` objects. */
  nodes: Array<PieceInfo>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PieceInfo` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `PieceInfo` edge in the connection. */
export type PieceInfosEdge = {
  __typename?: 'PieceInfosEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PieceInfo` at the end of the edge. */
  node: PieceInfo;
};

/** Methods to use when ordering `PieceInfo`. */
export enum PieceInfosOrderBy {
  BatchIdAsc = 'BATCH_ID_ASC',
  BatchIdDesc = 'BATCH_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DataCidAsc = 'DATA_CID_ASC',
  DataCidDesc = 'DATA_CID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReadyAtAsc = 'READY_AT_ASC',
  ReadyAtDesc = 'READY_AT_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Reads and enables pagination through a set of `Auction`. */
  allAuctions?: Maybe<AuctionsConnection>;
  /** Reads and enables pagination through a set of `Batch`. */
  allBatches?: Maybe<BatchesConnection>;
  /** Reads and enables pagination through a set of `BidEvent`. */
  allBidEvents?: Maybe<BidEventsConnection>;
  /** Reads and enables pagination through a set of `Bid`. */
  allBids?: Maybe<BidsConnection>;
  /** Reads and enables pagination through a set of `CompetitionResult`. */
  allCompetitionResults?: Maybe<CompetitionResultsConnection>;
  /** Reads and enables pagination through a set of `Deal`. */
  allDeals?: Maybe<DealsConnection>;
  /** Reads and enables pagination through a set of `PieceInfo`. */
  allPieceInfos?: Maybe<PieceInfosConnection>;
  /** Reads and enables pagination through a set of `StoragePayloadTag`. */
  allStoragePayloadTags?: Maybe<StoragePayloadTagsConnection>;
  /** Reads and enables pagination through a set of `StoragePayload`. */
  allStoragePayloads?: Maybe<StoragePayloadsConnection>;
  /** Reads and enables pagination through a set of `StorageProvider`. */
  allStorageProviders?: Maybe<StorageProvidersConnection>;
  /** Reads and enables pagination through a set of `StorageRequest`. */
  allStorageRequests?: Maybe<StorageRequestsConnection>;
  /** Reads a single `Auction` using its globally unique `ID`. */
  auction?: Maybe<Auction>;
  auctionById?: Maybe<Auction>;
  /** Reads a single `Batch` using its globally unique `ID`. */
  batch?: Maybe<Batch>;
  batchByStoragePayloadId?: Maybe<Batch>;
  /** Reads a single `Bid` using its globally unique `ID`. */
  bid?: Maybe<Bid>;
  bidById?: Maybe<Bid>;
  /** Reads a single `Deal` using its globally unique `ID`. */
  deal?: Maybe<Deal>;
  dealByBidId?: Maybe<Deal>;
  dealByBidIdAndAuctionId?: Maybe<Deal>;
  dealByStorageProviderIdAndAuctionId?: Maybe<Deal>;
  dealByStorageProviderIdAndBidId?: Maybe<Deal>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Reads a single `PieceInfo` using its globally unique `ID`. */
  pieceInfo?: Maybe<PieceInfo>;
  pieceInfoByBatchId?: Maybe<PieceInfo>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Reads a single `StoragePayload` using its globally unique `ID`. */
  storagePayload?: Maybe<StoragePayload>;
  storagePayloadById?: Maybe<StoragePayload>;
  /** Reads a single `StoragePayloadTag` using its globally unique `ID`. */
  storagePayloadTag?: Maybe<StoragePayloadTag>;
  storagePayloadTagByStoragePayloadIdAndKey?: Maybe<StoragePayloadTag>;
  /** Reads a single `StorageProvider` using its globally unique `ID`. */
  storageProvider?: Maybe<StorageProvider>;
  storageProviderById?: Maybe<StorageProvider>;
  /** Reads a single `StorageRequest` using its globally unique `ID`. */
  storageRequest?: Maybe<StorageRequest>;
  storageRequestById?: Maybe<StorageRequest>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllAuctionsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<AuctionCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<AuctionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllBatchesArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<BatchCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BatchesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllBidEventsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<BidEventCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BidEventsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllBidsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<BidCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BidsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllCompetitionResultsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<CompetitionResultCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CompetitionResultsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllDealsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<DealCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<DealsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllPieceInfosArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<PieceInfoCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PieceInfosOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllStoragePayloadTagsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<StoragePayloadTagCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StoragePayloadTagsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllStoragePayloadsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<StoragePayloadCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StoragePayloadsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllStorageProvidersArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<StorageProviderCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StorageProvidersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllStorageRequestsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<StorageRequestCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StorageRequestsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAuctionArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAuctionByIdArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBatchArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBatchByStoragePayloadIdArgs = {
  storagePayloadId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBidArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBidByIdArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDealArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDealByBidIdArgs = {
  bidId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDealByBidIdAndAuctionIdArgs = {
  auctionId: Scalars['String'];
  bidId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDealByStorageProviderIdAndAuctionIdArgs = {
  auctionId: Scalars['String'];
  storageProviderId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDealByStorageProviderIdAndBidIdArgs = {
  bidId: Scalars['String'];
  storageProviderId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPieceInfoArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPieceInfoByBatchIdArgs = {
  batchId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStoragePayloadArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStoragePayloadByIdArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStoragePayloadTagArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStoragePayloadTagByStoragePayloadIdAndKeyArgs = {
  key: Scalars['String'];
  storagePayloadId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStorageProviderArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStorageProviderByIdArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStorageRequestArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStorageRequestByIdArgs = {
  id: Scalars['String'];
};

export enum Status {
  Confirmation = 'CONFIRMATION',
  DealMaking = 'DEAL_MAKING',
  Finalized = 'FINALIZED',
  ReportFinalized = 'REPORT_FINALIZED'
}

export type StoragePayload = Node & {
  __typename?: 'StoragePayload';
  /** Reads and enables pagination through a set of `Auction`. */
  auctionsByStoragePayloadId: AuctionsConnection;
  /** Reads a single `Batch` that is related to this `StoragePayload`. */
  batchByStoragePayloadId?: Maybe<Batch>;
  carIpfsAddrs: Scalars['String'];
  carIpfsCid: Scalars['String'];
  carUrl: Scalars['String'];
  createdAt: Scalars['Datetime'];
  dealDuration: Scalars['Int'];
  /** Reads and enables pagination through a set of `Deal`. */
  dealsByStoragePayloadId: DealsConnection;
  disallowRebatching: Scalars['Boolean'];
  error: Scalars['String'];
  filEpochDeadline: Scalars['BigInt'];
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  origin: Scalars['String'];
  payloadCid: Scalars['String'];
  payloadSize?: Maybe<Scalars['BigInt']>;
  pieceCid: Scalars['String'];
  pieceSize: Scalars['BigInt'];
  proposalStartOffsetSeconds: Scalars['BigInt'];
  providers?: Maybe<Array<Maybe<Scalars['String']>>>;
  repFactor: Scalars['Int'];
  status: StoragePayloadStatus;
  /** Reads and enables pagination through a set of `StoragePayloadTag`. */
  storagePayloadTagsByStoragePayloadId: StoragePayloadTagsConnection;
  /** Reads and enables pagination through a set of `StorageRequest`. */
  storageRequestsByStoragePayloadId: StorageRequestsConnection;
  updatedAt: Scalars['Datetime'];
};


export type StoragePayloadAuctionsByStoragePayloadIdArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<AuctionCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<AuctionsOrderBy>>;
};


export type StoragePayloadDealsByStoragePayloadIdArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<DealCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<DealsOrderBy>>;
};


export type StoragePayloadStoragePayloadTagsByStoragePayloadIdArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<StoragePayloadTagCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StoragePayloadTagsOrderBy>>;
};


export type StoragePayloadStorageRequestsByStoragePayloadIdArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<StorageRequestCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StorageRequestsOrderBy>>;
};

/**
 * A condition to be used against `StoragePayload` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type StoragePayloadCondition = {
  /** Checks for equality with the object’s `carIpfsAddrs` field. */
  carIpfsAddrs?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `carIpfsCid` field. */
  carIpfsCid?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `carUrl` field. */
  carUrl?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `dealDuration` field. */
  dealDuration?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `disallowRebatching` field. */
  disallowRebatching?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `error` field. */
  error?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `filEpochDeadline` field. */
  filEpochDeadline?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `origin` field. */
  origin?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `payloadCid` field. */
  payloadCid?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `payloadSize` field. */
  payloadSize?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `pieceCid` field. */
  pieceCid?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `pieceSize` field. */
  pieceSize?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `proposalStartOffsetSeconds` field. */
  proposalStartOffsetSeconds?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `providers` field. */
  providers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `repFactor` field. */
  repFactor?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<StoragePayloadStatus>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
};

export enum StoragePayloadStatus {
  Auctioning = 'AUCTIONING',
  DealMaking = 'DEAL_MAKING',
  Error = 'ERROR',
  Preparing = 'PREPARING',
  Success = 'SUCCESS',
  Unknown = 'UNKNOWN'
}

export type StoragePayloadTag = Node & {
  __typename?: 'StoragePayloadTag';
  createdAt: Scalars['Datetime'];
  key: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `StoragePayload` that is related to this `StoragePayloadTag`. */
  storagePayloadByStoragePayloadId?: Maybe<StoragePayload>;
  storagePayloadId: Scalars['String'];
  value: Scalars['String'];
};

/**
 * A condition to be used against `StoragePayloadTag` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type StoragePayloadTagCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `key` field. */
  key?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `storagePayloadId` field. */
  storagePayloadId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `value` field. */
  value?: Maybe<Scalars['String']>;
};

/** A connection to a list of `StoragePayloadTag` values. */
export type StoragePayloadTagsConnection = {
  __typename?: 'StoragePayloadTagsConnection';
  /** A list of edges which contains the `StoragePayloadTag` and cursor to aid in pagination. */
  edges: Array<StoragePayloadTagsEdge>;
  /** A list of `StoragePayloadTag` objects. */
  nodes: Array<StoragePayloadTag>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `StoragePayloadTag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `StoragePayloadTag` edge in the connection. */
export type StoragePayloadTagsEdge = {
  __typename?: 'StoragePayloadTagsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `StoragePayloadTag` at the end of the edge. */
  node: StoragePayloadTag;
};

/** Methods to use when ordering `StoragePayloadTag`. */
export enum StoragePayloadTagsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StoragePayloadIdAsc = 'STORAGE_PAYLOAD_ID_ASC',
  StoragePayloadIdDesc = 'STORAGE_PAYLOAD_ID_DESC',
  ValueAsc = 'VALUE_ASC',
  ValueDesc = 'VALUE_DESC'
}

/** A connection to a list of `StoragePayload` values. */
export type StoragePayloadsConnection = {
  __typename?: 'StoragePayloadsConnection';
  /** A list of edges which contains the `StoragePayload` and cursor to aid in pagination. */
  edges: Array<StoragePayloadsEdge>;
  /** A list of `StoragePayload` objects. */
  nodes: Array<StoragePayload>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `StoragePayload` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `StoragePayload` edge in the connection. */
export type StoragePayloadsEdge = {
  __typename?: 'StoragePayloadsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `StoragePayload` at the end of the edge. */
  node: StoragePayload;
};

/** Methods to use when ordering `StoragePayload`. */
export enum StoragePayloadsOrderBy {
  CarIpfsAddrsAsc = 'CAR_IPFS_ADDRS_ASC',
  CarIpfsAddrsDesc = 'CAR_IPFS_ADDRS_DESC',
  CarIpfsCidAsc = 'CAR_IPFS_CID_ASC',
  CarIpfsCidDesc = 'CAR_IPFS_CID_DESC',
  CarUrlAsc = 'CAR_URL_ASC',
  CarUrlDesc = 'CAR_URL_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DealDurationAsc = 'DEAL_DURATION_ASC',
  DealDurationDesc = 'DEAL_DURATION_DESC',
  DisallowRebatchingAsc = 'DISALLOW_REBATCHING_ASC',
  DisallowRebatchingDesc = 'DISALLOW_REBATCHING_DESC',
  ErrorAsc = 'ERROR_ASC',
  ErrorDesc = 'ERROR_DESC',
  FilEpochDeadlineAsc = 'FIL_EPOCH_DEADLINE_ASC',
  FilEpochDeadlineDesc = 'FIL_EPOCH_DEADLINE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  OriginAsc = 'ORIGIN_ASC',
  OriginDesc = 'ORIGIN_DESC',
  PayloadCidAsc = 'PAYLOAD_CID_ASC',
  PayloadCidDesc = 'PAYLOAD_CID_DESC',
  PayloadSizeAsc = 'PAYLOAD_SIZE_ASC',
  PayloadSizeDesc = 'PAYLOAD_SIZE_DESC',
  PieceCidAsc = 'PIECE_CID_ASC',
  PieceCidDesc = 'PIECE_CID_DESC',
  PieceSizeAsc = 'PIECE_SIZE_ASC',
  PieceSizeDesc = 'PIECE_SIZE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProposalStartOffsetSecondsAsc = 'PROPOSAL_START_OFFSET_SECONDS_ASC',
  ProposalStartOffsetSecondsDesc = 'PROPOSAL_START_OFFSET_SECONDS_DESC',
  ProvidersAsc = 'PROVIDERS_ASC',
  ProvidersDesc = 'PROVIDERS_DESC',
  RepFactorAsc = 'REP_FACTOR_ASC',
  RepFactorDesc = 'REP_FACTOR_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type StorageProvider = Node & {
  __typename?: 'StorageProvider';
  bidbotVersion: Scalars['String'];
  /** Reads and enables pagination through a set of `Bid`. */
  bidsByStorageProviderId: BidsConnection;
  cidGravityConfigured: Scalars['Boolean'];
  cidGravityStrict: Scalars['Boolean'];
  dealStartWindow: Scalars['BigInt'];
  /** Reads and enables pagination through a set of `Deal`. */
  dealsByStorageProviderId: DealsConnection;
  firstSeenAt: Scalars['Datetime'];
  id: Scalars['String'];
  lastSeenAt: Scalars['Datetime'];
  lastUnhealthyAt?: Maybe<Scalars['Datetime']>;
  lastUnhealthyError?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};


export type StorageProviderBidsByStorageProviderIdArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<BidCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BidsOrderBy>>;
};


export type StorageProviderDealsByStorageProviderIdArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<DealCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<DealsOrderBy>>;
};

/**
 * A condition to be used against `StorageProvider` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type StorageProviderCondition = {
  /** Checks for equality with the object’s `bidbotVersion` field. */
  bidbotVersion?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `cidGravityConfigured` field. */
  cidGravityConfigured?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `cidGravityStrict` field. */
  cidGravityStrict?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `dealStartWindow` field. */
  dealStartWindow?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `firstSeenAt` field. */
  firstSeenAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `lastSeenAt` field. */
  lastSeenAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `lastUnhealthyAt` field. */
  lastUnhealthyAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `lastUnhealthyError` field. */
  lastUnhealthyError?: Maybe<Scalars['String']>;
};

/** A connection to a list of `StorageProvider` values. */
export type StorageProvidersConnection = {
  __typename?: 'StorageProvidersConnection';
  /** A list of edges which contains the `StorageProvider` and cursor to aid in pagination. */
  edges: Array<StorageProvidersEdge>;
  /** A list of `StorageProvider` objects. */
  nodes: Array<StorageProvider>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `StorageProvider` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `StorageProvider` edge in the connection. */
export type StorageProvidersEdge = {
  __typename?: 'StorageProvidersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `StorageProvider` at the end of the edge. */
  node: StorageProvider;
};

/** Methods to use when ordering `StorageProvider`. */
export enum StorageProvidersOrderBy {
  BidbotVersionAsc = 'BIDBOT_VERSION_ASC',
  BidbotVersionDesc = 'BIDBOT_VERSION_DESC',
  CidGravityConfiguredAsc = 'CID_GRAVITY_CONFIGURED_ASC',
  CidGravityConfiguredDesc = 'CID_GRAVITY_CONFIGURED_DESC',
  CidGravityStrictAsc = 'CID_GRAVITY_STRICT_ASC',
  CidGravityStrictDesc = 'CID_GRAVITY_STRICT_DESC',
  DealStartWindowAsc = 'DEAL_START_WINDOW_ASC',
  DealStartWindowDesc = 'DEAL_START_WINDOW_DESC',
  FirstSeenAtAsc = 'FIRST_SEEN_AT_ASC',
  FirstSeenAtDesc = 'FIRST_SEEN_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LastSeenAtAsc = 'LAST_SEEN_AT_ASC',
  LastSeenAtDesc = 'LAST_SEEN_AT_DESC',
  LastUnhealthyAtAsc = 'LAST_UNHEALTHY_AT_ASC',
  LastUnhealthyAtDesc = 'LAST_UNHEALTHY_AT_DESC',
  LastUnhealthyErrorAsc = 'LAST_UNHEALTHY_ERROR_ASC',
  LastUnhealthyErrorDesc = 'LAST_UNHEALTHY_ERROR_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type StorageRequest = Node & {
  __typename?: 'StorageRequest';
  /** Reads a single `Batch` that is related to this `StorageRequest`. */
  batchByStoragePayloadId?: Maybe<Batch>;
  createdAt: Scalars['Datetime'];
  dataCid: Scalars['String'];
  errorCause: Scalars['String'];
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  origin: Scalars['String'];
  rebatchCount: Scalars['Int'];
  status: StorageRequestStatus;
  /** Reads a single `StoragePayload` that is related to this `StorageRequest`. */
  storagePayloadByStoragePayloadId?: Maybe<StoragePayload>;
  storagePayloadId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Datetime'];
};

/**
 * A condition to be used against `StorageRequest` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type StorageRequestCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `dataCid` field. */
  dataCid?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `errorCause` field. */
  errorCause?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `origin` field. */
  origin?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `rebatchCount` field. */
  rebatchCount?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<StorageRequestStatus>;
  /** Checks for equality with the object’s `storagePayloadId` field. */
  storagePayloadId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
};

export enum StorageRequestStatus {
  Auctioning = 'AUCTIONING',
  Batching = 'BATCHING',
  DealMaking = 'DEAL_MAKING',
  Error = 'ERROR',
  Preparing = 'PREPARING',
  Success = 'SUCCESS',
  Unknown = 'UNKNOWN'
}

/** A connection to a list of `StorageRequest` values. */
export type StorageRequestsConnection = {
  __typename?: 'StorageRequestsConnection';
  /** A list of edges which contains the `StorageRequest` and cursor to aid in pagination. */
  edges: Array<StorageRequestsEdge>;
  /** A list of `StorageRequest` objects. */
  nodes: Array<StorageRequest>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `StorageRequest` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `StorageRequest` edge in the connection. */
export type StorageRequestsEdge = {
  __typename?: 'StorageRequestsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `StorageRequest` at the end of the edge. */
  node: StorageRequest;
};

/** Methods to use when ordering `StorageRequest`. */
export enum StorageRequestsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DataCidAsc = 'DATA_CID_ASC',
  DataCidDesc = 'DATA_CID_DESC',
  ErrorCauseAsc = 'ERROR_CAUSE_ASC',
  ErrorCauseDesc = 'ERROR_CAUSE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  OriginAsc = 'ORIGIN_ASC',
  OriginDesc = 'ORIGIN_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RebatchCountAsc = 'REBATCH_COUNT_ASC',
  RebatchCountDesc = 'REBATCH_COUNT_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  StoragePayloadIdAsc = 'STORAGE_PAYLOAD_ID_ASC',
  StoragePayloadIdDesc = 'STORAGE_PAYLOAD_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export enum UnpreparedBatchStatus {
  Done = 'DONE',
  Executing = 'EXECUTING',
  Pending = 'PENDING'
}

export type StatusByCidQueryVariables = Exact<{
  dataCid: Scalars['String'];
}>;


export type StatusByCidQuery = { __typename?: 'Query', requests?: { __typename?: 'StorageRequestsConnection', nodes: Array<{ __typename?: 'StorageRequest', status: StorageRequestStatus, id: string, cid: string, batch?: { __typename?: 'Batch', payload?: { __typename?: 'StoragePayload', deals: { __typename?: 'DealsConnection', nodes: Array<{ __typename?: 'Deal', deal_id: any, miner: string, deal_expiration: any, deal_status: MarketDealStatus }> } } | null | undefined } | null | undefined }> } | null | undefined };

export type StatusByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type StatusByIdQuery = { __typename?: 'Query', requests?: { __typename?: 'StorageRequestsConnection', nodes: Array<{ __typename?: 'StorageRequest', status: StorageRequestStatus, id: string, cid: string, batch?: { __typename?: 'Batch', payload?: { __typename?: 'StoragePayload', deals: { __typename?: 'DealsConnection', nodes: Array<{ __typename?: 'Deal', deal_id: any, miner: string, deal_expiration: any, deal_status: MarketDealStatus }> } } | null | undefined } | null | undefined }> } | null | undefined };


export const StatusByCidDocument = gql`
    query statusByCid($dataCid: String!) {
  requests: allStorageRequests(condition: {dataCid: $dataCid}) {
    nodes {
      status
      id
      cid: dataCid
      batch: batchByStoragePayloadId {
        payload: storagePayloadByStoragePayloadId {
          deals: dealsByStoragePayloadId {
            nodes {
              deal_id: dealId
              miner: storageProviderId
              deal_expiration: dealExpiration
              deal_status: marketDealStatus
            }
          }
        }
      }
    }
  }
}
    `;
export const StatusByIdDocument = gql`
    query statusById($id: String!) {
  requests: allStorageRequests(condition: {id: $id}) {
    nodes {
      status
      id
      cid: dataCid
      batch: batchByStoragePayloadId {
        payload: storagePayloadByStoragePayloadId {
          deals: dealsByStoragePayloadId {
            nodes {
              deal_id: dealId
              miner: storageProviderId
              deal_expiration: dealExpiration
              deal_status: marketDealStatus
            }
          }
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();
const StatusByCidDocumentString = print(StatusByCidDocument);
const StatusByIdDocumentString = print(StatusByIdDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    statusByCid(variables: StatusByCidQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: StatusByCidQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<StatusByCidQuery>(StatusByCidDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'statusByCid');
    },
    statusById(variables: StatusByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: StatusByIdQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<StatusByIdQuery>(StatusByIdDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'statusById');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;