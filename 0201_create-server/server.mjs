import { createServer } from "node:http";

const server = createServer((request, response) => {
  response.setHeader("Content-Type", "text/plain; charset=utf-8");

  if (request.method === "GET" && request.url === "/") {
    response.statusCode = 200;
    response.end("Home.");
  } else if (request.method === "POST" && request.url === "/product") {
    response.statusCode = 201;
    response.end("Product created.");
  } else {
    response.statusCode = 404;
    response.end("Not found.");
  }

  console.log(request.method);
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});