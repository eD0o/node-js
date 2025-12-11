const base = 'http://localhost:3000'

setTimeout(async () => {
  const response = await fetch(base + "/")
  console.log(response)
}, 0)