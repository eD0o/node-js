import { createServer } from 'node:http';
import { Router } from './router.mjs';
import { customRequest } from './custom-request.mjs';
import { customResponse } from './custom-response.mjs';
import { createCourse } from './database.mjs';

const router = new Router();

router.post('/courses', (req, res) => {
  const { slug, name, description } = req.body;
  const created = createCourse({ slug, name, description })
  if (created) {
    res.status(201).json("Course Created:", name)
  } else {
    res.end('Error')
  }
})

router.post('/classes', (req, res) => {

})

router.get('/course', (req, res) => {

})

router.get('/class', (req, res) => {

})

const server = createServer(async (request, response) => {

  const req = await customRequest(request);
  const res = customResponse(response)

  const handler = router.find(req.method, req.pathname);

  if (handler) {
    handler(req, res);
  } else {
    res.status(404).end("Not found.");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});