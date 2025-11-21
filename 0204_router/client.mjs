const res = await fetch("http://localhost:3000/", {
  method: "GET",
  headers: { 'Content-Type': 'application/json' },
});

console.log(res)

const body = await res.text();

console.log(body)