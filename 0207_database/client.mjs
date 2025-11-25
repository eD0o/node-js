// case 1: POST - /products

const notebookPost = await fetch("http://localhost:3000/products", {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Notebook', slug: 'notebook', category: 'eletronics', price: 3000 })
});

console.log(notebookPost)

const body = await notebookPost.text();

console.log(body)

await fetch("http://localhost:3000/products", {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Monitor', slug: 'monitor', category: 'eletronics', price: 1500 })
});

// case 2: GET - /product

const productGet = await fetch("http://localhost:3000/product?category=eletronics&slug=notebook");

const productGetJson = await productGet.json()

console.log(productGetJson)

// case 3: GET - /products

const productsGet = await fetch("http://localhost:3000/products");

const productsGetJson = await productsGet.json()

console.log(productsGetJson)

