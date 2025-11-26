const base = 'http://localhost:3000'

await fetch(base + "/courses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    slug: 'javascript',
    name: 'JavaScript',
    description: 'JavaScript Course'
  })
})

await fetch(base + "/courses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    slug: 'css',
    name: 'css',
    description: 'Css Course'
  })
})

await fetch(base + "/courses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    slug: 'html',
    name: 'html',
    description: 'HTML Course'
  })
})

await fetch(base + "/courses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    slug: 'typescript',
    name: 'typescript',
    description: 'TypeScript Course'
  })
})