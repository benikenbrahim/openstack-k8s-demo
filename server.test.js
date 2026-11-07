import { test } from "node:test";
import assert from "node:assert/strict";
import { handler } from "./server.js";

test("health endpoint returns 200", () => {
  const response = {
    status: null,
    body: "",
    setHeader() {},
    writeHead(status) { this.status = status; },
    end(body) { this.body = body; }
  };

  handler({ url: "/health" }, response);

  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(response.body), { status: "ok" });
});
