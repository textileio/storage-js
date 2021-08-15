import type { Readable } from "stream";
import { isReadableStream } from "./utils";

/**
 * Status is the status of a StorageRequest.
 * * `Unknown` is the default value to an unitialized StorageRequest. This status must be
 *   considered invalid in any real StorageRequest instance.
 * * `Batching` indicates that the storage request is being batched.
 * * `Preparing` indicates that the batch containing the data is being prepared.
 * * `Auctioning` indicates that the batch containing the data is being auctioned.
 * * `DealMaking` indicates that the data is in deal-making process.
 * * `Success` indicates that the request was stored in Filecoin.
 * * `Error indicates that there is some error handling the request.
 */
type Status =
  | "Unknown"
  | "Batching"
  | "Preparing"
  | "Auctioning"
  | "DealMaking"
  | "Success"
  | "Error";

/**
 * Request is a request for storing data in a Provider.
 */
export interface Request {
  id: string;
  cid: {
    "/": string;
  };
  status_code: Status;
}

/**
 * RequestInfo describes the current state of a request.
 */
export interface RequestInfo {
  request: Request;
  deals: Deal[];
}

/**
 * Deal contains information of an on-chain deal.
 * TODO: We may have to consider using BigInt for deal expiration in the future.
 */
export interface Deal {
  miner: string;
  deal_id: number;
  deal_expiration: number;
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
  store: (data: File | Readable, config?: OpenOptions) => Promise<Request>;

  /**
   * Retrieve the status of a storage request from a remote provider.
   *
   * @param id The id of the storage request, as returned from the `store` function.
   * @returns Promise that resolves to a storage RequestInfo object.
   */
  status: (id: string) => Promise<RequestInfo>;
}

export interface StorageConfig {
  token: string;
  host: string;
}

export function create({ token, host }: StorageConfig): StorageAPI {
  if (!host) throw new Error("Must provide remote host url");
  if (!token) throw new Error("Must provide self-signed access token");
  return {
    store: async function store(
      data: File | Readable,
      { headers }: OpenOptions = {}
    ): Promise<Request> {
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
        const json = await res.json();
        return json;
      }
      const err = await res.text();
      throw new Error(err);
    },
    status: async function status(id: string): Promise<RequestInfo> {
      const res = await fetch(`${host}/storagerequest/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
      const err = await res.text();
      throw new Error(err);
    },
  };
}
