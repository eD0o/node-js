const base = 'http://localhost:3000'

const response = await fetch(base + "/course/javascript")
console.log(response.ok, response.status)

const response2 = await fetch(base + "/")
console.log(response2.ok, response2.status)
