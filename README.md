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
