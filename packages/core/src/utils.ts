/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// Copyright (c) 2016 - 2020 Node Fetch Team
// https://github.com/node-fetch/node-fetch/blob/master/src/utils/is.js
import type { Readable } from "stream";

function isStream(stream: any) {
  return (
    stream !== null &&
    typeof stream === "object" &&
    typeof stream.pipe === "function"
  );
}

export function isReadableStream(stream: any): stream is Readable {
  return (
    isStream(stream) &&
    stream.readable !== false &&
    typeof stream._read === "function" &&
    typeof stream._readableState === "object"
  );
}
