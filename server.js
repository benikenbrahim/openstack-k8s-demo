import http from "node:http";
import os from "node:os";

const handler = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/health") {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: "ok" }));
  }

  if (req.url === "/") {
    res.writeHead(200);
    return res.end(JSON.stringify({
      message: "Hello from Kubernetes on OpenStack!",
      hostname: os.hostname(),
      version: "1.0.0"
    }));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
};

const server = http.createServer(handler);

if (process.env.NODE_ENV !== "test") {
  server.listen(3000, "0.0.0.0", () => {
    console.log("API listening on port 3000");
  });
}

export { handler };
