import { createServer } from 'node:http';
import { Router } from './router.mjs';
import { customRequest } from './custom-request.mjs';
import { customResponse } from './custom-response.mjs';
import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises';

const router = new Router();

router.post('/products', async (req, res) => {
  const { category, slug } = req.body
  try {
    await mkdir(`./products/${category}`)
  } catch {
    console.log(`Category: "${category}" already exists.`)
  }
  try {
    await writeFile(`./products/${category}/${slug}.json`, JSON.stringify(req.body));
    res.status(201).json(`The product: '${slug}' was created.`)
  } catch (error) {
    res.status(500).end(`Error: ${error}`)
  }
})

router.get('/products', async (req, res) => {
  try {
    const filesList = await readdir('./products', { recursive: true })
    const filesJson = filesList.filter(item => item.endsWith('.json'))
    console.log(filesJson)
    const promises = []
    for (const file of filesJson) {
      const content = await readFile(`./products/${file}`, 'utf-8')
      promises.push(content)
    }
    const contents = await Promise.all(promises)
    const products = contents.map(JSON.parse)
    console.log(products)
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
    res.status(404).json('Products not found.', error)
  }
})

router.get('/product', async (req, res) => {
  // console.log(`Category Query: ${req.query.get('category')}.\nSlug Query: ${req.query.get('slug')}.`)
  const category = req.query.get('category')
  const slug = req.query.get('slug')
  try {
    const content = await readFile(`./products/${category}/${slug}.json`, 'utf-8')
    const product = JSON.parse(content)
    res.status(200).json(product)
  }
  catch (error) {
    console.log(error)
    res.status(404).json('Product not found.', error)
  }
})

const server = createServer(async (request, response) => {

  const req = await customRequest(request);
  const res = customResponse(response)

  const handler = router.find(req.method, req.pathname);

  if (handler) {
    handler(req, res);
  } else {
    res.status(404).end("Not found.");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});