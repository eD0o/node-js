import fs from "node:fs/promises";

try {
  await fs.mkdir("./products");
} catch {
  console.log("Directory already exists");
}

fs.writeFile('./products/notebook.json', JSON.stringify({
  name: "notebook",
  price: 3799.99,
}));

const data = await fs.readFile('./products/notebook.json', 'utf-8');

const dir = await fs.readdir('./products', { recursive: true });

console.log(data);

console.log(dir);
console.log(dir.filter((file => file.endsWith('.json'))));