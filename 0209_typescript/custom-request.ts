import type { IncomingMessage } from "node:http";

interface CustomRequest extends IncomingMessage {
  query: URLSearchParams;
  pathname: string;
  body: Record<string, any>
}

export async function customRequest(request: IncomingMessage) {
  const req = request as CustomRequest
  // URL Parsing
  const url = new URL(req.url || "/", "http://localhost");
  req.pathname = url.pathname;
  req.query = url.searchParams;

  // Body Parsing
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString("utf-8");
  if (req.headers["content-type"] === "application/json") {
    req.body = JSON.parse(body);
  } else {
    req.body = {};
  }
  return req;
}
