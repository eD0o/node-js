const res = await fetch("http://localhost:3000/", {
  method: "GET"
});

console.log(res)

const body = await res.text();

console.log(body)