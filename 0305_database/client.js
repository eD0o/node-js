const base = 'http://localhost:3000'

setTimeout(async () => {
  const response = await fetch(base + "/products/notebook")
  console.log(response.ok, response.status)
  
  const body = await response.json()
  console.log(body)

  const response2 = await fetch(base + "/")
  console.log(response2.ok, response2.status)
}, 200)

