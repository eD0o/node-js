const base = 'http://localhost:3000'

// POST /courses

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

// POST /classes

await fetch(base + "/classes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    slug: 'variables',
    name: 'Variables',
    courseSlug: 'javascript'
  })
})

await fetch(base + "/classes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    slug: 'arrays',
    name: 'Arrays',
    courseSlug: 'javascript'
  })
})

// GET /courses

const courses = await fetch(base + "/courses").then((r) => r.json())
console.log(courses)

// GET /course

const course = await fetch(base + "/course?slug=javascript").then((r) => r.json())
console.log(course)

// GET /classes

const classes = await fetch(base + "/classes?course=javascript").then((r) => r.json())
console.log(classes)

// GET /class

const classTitle = await fetch(base + "/class?course=javascript&slug=arrays").then((r) => r.json())
console.log(classTitle)