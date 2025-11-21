import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  const url = new URL(req.url, `htpp://localhost:3000`)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  console.log(req.headers)

  if (req.method === "GET" && url.pathname === "/") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`
        <html>
          <head>
            <title>Hi</title>
          </head>
          <body>
           <h1>Hello World</h1>
          </body>
        </html>
      `);
  } else if (req.method === "POST" && url.pathname === "/products") {
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ name: 'Notebook' }));
  } else {
    res.statusCode = 404;
    res.end("Not found.");
  }

  console.log(req.method);
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});