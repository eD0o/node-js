const res = await fetch("http://localhost:3000/products?color=blue&size=g", {
  method: "POST",
  headers: { 'Content-Type': 'application/json' }
});

const body = await res.text();

console.log(body)