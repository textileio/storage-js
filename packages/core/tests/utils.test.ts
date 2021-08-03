import { expect } from "chai";
import { Readable } from "stream";

import { isReadableStream } from "../src/utils";

describe("core/utils", () => {
  test("check if something is a stream", async () => {
    const readable = Readable.from(["input string"]);
    expect(isReadableStream(readable)).to.be.true;

    expect(isReadableStream({})).to.be.false;
  });
});
