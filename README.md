# 2 - Simple Server

## 2.1 - Create Server

Function to create a simple HTTP server using Node.js `http` module.

Basic structure: callback function `((req, res) => {})` that handles incoming requests and sends responses.

```js
//Response:
import { createServer } from "node:http";

const server = createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.end("Hello World");
});
```

```js
// Request:
const server = createServer((request, response) => {
  response.setHeader("Content-Type", "text/plain; charset=utf-8");

  // REQUEST CONDITIONAL
  if (request.method === "GET" && request.url === "/") {
    //response according to request
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
```

### 2.1.1 - Listen on Port

Method `server.listen(port, callback)` to start the server on a specified port.

```js
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
```

Basic example of a complete server:

```js
// server.mjs
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
```

```js
// client.mjs
const response = await fetch("http://localhost:3000", { method: "GET" });

console.log(response);
```

## 2.2 - Request