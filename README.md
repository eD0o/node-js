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

### 2.2.1 - Headers

content-type indicates the `media type of the resource`, as:

- text/html: HTML document
- application/json: JSON format
- multipart/form-data: form data with files

> Because of the hyphen in content-type, when accessing it via req.headers, use bracket notation: req.headers['content-type'], others can be accessed via dot notation: req.headers.cookie

Also, you have other headers as authentication, user-agent, cookies, x-forwarded-for (origin IP) and more.

### 2.2.2 - URL

`Part of the URL route can be accessed via req.url` -> it contains the path and query string, e.g., /route?query=1.

`new URL(path, host) makes the parse` and create an URL object.

```js
const url = new URL(req.url || "/", `${req.headers.host}`); // ❌ avoid this, it's possible to fake the host
const url = new URL(req.url || "/", "http://localhost"); // ✅ the right way
```

> Don't trust in req.headers.host, it's provided by the client and can be faked.

To get the searchParams you you can use url.searchParams.get('paramName')

### 2.2.3 - for await

Makes it possible to `loop through async iterables`. It's useful to read request body data in chunks.

```js
const example1 = Promise.resolve("Hello");
const example2 = Promise.resolve("World");
const phrases = [];

for await (const phrases of [example1, example2]) {
  phrases.push(phrases);
}

phrases.join(" "); // "Hello World"
```

### 2.2.4 - Buffer

Buffer is a block of bytes in memory. `To transform these bytes into usable data we need to concatenate them` in an appropriate data structure.

Buffer.from -> transforms data into a buffer.
Buffer.concat -> Concatenates multiple buffers into one.

```js
const example1 = Buffer.from("Hello");
const example2 = Buffer.from("World");
const phrases = Buffer.concat([part1, part2]);

console.log(final); // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
console.log(final.toString()); // "Hello World"
```

In some real example with for await:

```js
const chunks = [];

for await (const chunk of req) {
  chunks.push(chunk);
}

const body = Buffer.concat(chunks).toString("utf-8");
```

You can also use callbacks to handle it:

```js
const chunks = [];
req
  .on("error", (err) => {
    console.error(err);
  })
  .on("data", (chunk) => {
    chunks.push(chunk);
  })
  .on("end", () => {
    const body = Buffer.concat(chunks).toString("utf-8");
  });
```

## 2.3 - Response

It's about sending data back to the client.

### 2.3.1 - setHeader

Defines a response header key-value pair. It allows the CORS control, origin, content-type, and more.

| Header / Directive               | What It Does                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Access-Control-Allow-Methods** | Defines which HTTP methods (GET, POST, etc.) are allowed by the server.                          |
| **Set-Cookie**                   | Sends cookies from the server to the client to be stored and resent later.                       |
| **Access-Control-Allow-Origin**  | Specifies which URLs/origins are allowed to make requests to the server. `*` allows all origins. |

```js
// CORS
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader(
  "Access-Control-Allow-Methods",
  "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
);
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

// Cache
res.setHeader("Cache-Control", "max-age=300, must-revalidate");

// Cookie
res.setHeader(
  "Set-Cookie",
  "token=123; HttpOnly; SameSite=Strict; Max-Age=3600; Path=/; Secure;"
);
```

### 2.3.2 - statusCode

https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status -> to know more about status codes.
