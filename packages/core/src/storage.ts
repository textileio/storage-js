import type { Readable } from "stream";
import fetch from "cross-fetch";
import { isReadableStream } from "./utils";
import {
  StorageRequestStatus,
  getSdk,
  StatusByIdQuery,
  StatusByCidQuery,
  MarketDealStatus,
} from "./client";
import { GraphQLClient } from "graphql-request";

const DEFAULT_GATEWAY = "https://gateway.pinata.cloud";

export { StorageRequestStatus, MarketDealStatus };

export interface StorageRequest {
  id: string;
  cid: {
    "/": string;
  };
  status: StorageRequestStatus;
}

type RequestAlias = Omit<StorageRequest, "status"> & { status_code: string };

/**
 * RequestStatus describes the current state of a request.
 */
export interface RequestStatus {
  request: StorageRequest;
  deals: DealInfo[];
}

/**
 * DealInfo contains information about an on-chain deal.
 */
export interface DealInfo {
  miner: string;
  deal_id: number;
  deal_expiration: number;
  deal_status: MarketDealStatus;
}

export interface OpenOptions {
  headers?: Record<string, string | number>;
}

export interface StorageAPI {
  /**
   * Create a storage request with a remote provider.
   *
   * In a browser, data should be a File object. In NodeJS, specify a Readable stream of the
   * FormData bytes. See the example for details.
   * @param data The File or Readable stream object to upload.
   * @param options Optional parameters to control API calls.
   * @returns Promise that resolves to a storage Request object.
   *
   * @example <caption>Browser usage</caption>
   * const blob = new Blob(["Hello, world!"], { type: "text/plain" });
   * const file = new File([blob], "welcome.txt", {
   *   type: "text/plain",
   *   lastModified: new Date().getTime()
   * });
   * storage.store(file)
   *   .then((request) => console.log(request));
   *
   * @example <caption>NodeJS usage</caption>
   * import { FormData } from "formdata-node";
   * import { Encoder } from "form-data-encoder";
   * import { Readable } from "stream";
   *
   * const formData = new NodeForm();
   * formData.set("file", "Hello, world!");
   * const encoder = new Encoder(formData);
   * const readable = Readable.from(encoder);
   * storage.store(readable, { headers: encoder.headers })
   *   .then((request) => console.log(request));
   */
  store: (
    data: File | Readable,
    config?: OpenOptions
  ) => Promise<StorageRequest>;

  /**
   * Retrieve the status of a storage request from a remote provider.
   *
   * @param id The id of the storage request, as returned from the `store` function.
   * @returns Promise that resolves to a RequestStatus object.
   */
  status: (id: string) => Promise<RequestStatus>;

  /**
   * Retrieve the status of a storage request from a remote provider.
   *
   * @param cid The cid of the target data, as returned from the `store` function.
   * @returns Promise that resolves to an array of storage RequestStatus objects.
   */
  statusByCid: (id: string) => Promise<RequestStatus[]>;

  fetchByCid: (cid: string) => Promise<Response>;
}

export interface StorageConfig {
  token: string;
  host: string;
  gateway?: string;
}

const toSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter, index) => {
    return index == 0 ? letter.toLowerCase() : "_" + letter.toLowerCase();
  });

export function create({ token, host, gateway }: StorageConfig): StorageAPI {
  if (!host) throw new Error("Must provide remote host url");
  if (!token) throw new Error("Must provide self-signed access token");
  if (!gateway) {
    gateway = DEFAULT_GATEWAY;
  }
  const client = new GraphQLClient(`${host}/graphql`);
  const sdk = getSdk(client);
  return {
    store: async function store(
      data: File | Readable,
      { headers }: OpenOptions = {}
    ): Promise<StorageRequest> {
      let body: FormData | Readable;
      if (isReadableStream(data)) {
        body = data;
      } else {
        body = new FormData();
        body.append("file", data as File, data.name);
      }
      const res = await fetch(`${host}/upload`, {
        method: "POST",
        body: body as BodyInit,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const { status_code, ...rest }: RequestAlias = await res.json();
        const request: StorageRequest = {
          ...rest,
          status: toSnakeCase(
            status_code
          ).toUpperCase() as StorageRequestStatus,
        };
        return request;
      }
      const err = await res.text();
      throw new Error(err);
    },
    status: async function status(id: string): Promise<RequestStatus> {
      const { data } = await sdk.statusById({ id });
      const response = data ? processResponse(data) : [];
      if (response.length < 1) throw new Error("not found");
      return response[0];
    },
    statusByCid: async function statusByCid(
      dataCid: string
    ): Promise<RequestStatus[]> {
      const { data } = await sdk.statusByCid({ dataCid });
      const response = data ? processResponse(data) : [];
      return response;
    },
    fetchByCid: async function fetchByCid(cid: string): Promise<Response> {
      return fetch(`${gateway}/ipfs/${cid}`);
    },
  };
}

function processResponse(
  data: StatusByCidQuery | StatusByIdQuery
): RequestStatus[] {
  const response: RequestStatus[] = (data?.requests?.nodes ?? []).map(
    (node) => {
      const request: StorageRequest = {
        status: node.status,
        id: node.id,
        cid: { "/": node.cid },
      };
      const deals = node.batch?.payload?.deals?.nodes ?? [];
      return { request, deals };
    }
  );
  return response;
}
