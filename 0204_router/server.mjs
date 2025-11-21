import { createServer } from 'node:http';
import { Router } from './router.mjs';

const router = new Router();

router.get('/', (req, res) => {
  res.end('Home');
});

router.get('/contato', (req, res) => {
  res.end('Contato');
});

router.get('/produto/notebook', (req, res) => {
  res.end('Produtos - Notebook');
});

const server = createServer((req, res) => {
  const url = new URL(req.url, `htpp://localhost:3000`)
  console.log(req.headers)
  
  const handler = router.find(req.method, url.pathname);
  if (handler) {
    handler(req, res);
  } else {
    res.statusCode = 404;
    res.end("Not found.");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});