import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  const url = new URL(req.url, `htpp://localhost:3000`)
  const color = url.searchParams.get("color")
  const size = url.searchParams.get("size")

  console.log(req.headers)

  if (req.method === "GET" && url.pathname === "/") {
    res.statusCode = 200;
    res.end("Home.");
  } else if (req.method === "POST" && url.pathname === "/products") {
    res.statusCode = 201;
    res.end(`Products: ${color}, ${size}`);
  } else {
    res.statusCode = 404;
    res.end("Not found.");
  }

  console.log(req.method);
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});