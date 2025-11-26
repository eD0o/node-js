import { createServer } from 'node:http';
import { Router } from './router.mjs';
import { customRequest } from './custom-request.mjs';
import { customResponse } from './custom-response.mjs';
import { createCourse, createClass, getCourses, getCourse, getClasses, getClass } from './database.mjs';

const router = new Router();

router.post('/courses', (req, res) => {
  const { slug, name, description } = req.body;
  const created = createCourse({ slug, name, description })
  if (created) {
    res.status(201).json("Course Created:", name)
  } else {
    res.status(400).json('Error.')
  }
})

router.post('/classes', (req, res) => {
  const { slug, name, courseSlug } = req.body;
  const created = createClass({ slug, name, courseSlug })
  if (created) {
    res.status(201).json("Class Created:", name)
  } else {
    res.status(400).json('Error.')
  }
})

router.get('/courses', (req, res) => {
  const listCourses = getCourses()
  if (listCourses && listCourses.length) {
    res.status(200).json(listCourses)
  } else {
    res.status(404).json('Courses not found.')
  }
})

router.get('/course', (req, res) => {
  const slug = req.query.get("slug")
  const course = getCourse(slug)
  if (course) {
    res.status(200).json(course)
  } else {
    res.status(404).json('Course not found.')
  }
})

router.get('/classes', (req, res) => {
  const courseSlug = req.query.get("course")
  const listClasses = getClasses(courseSlug)
  if (listClasses && listClasses.length) {
    res.status(200).json(listClasses)
  } else {
    res.status(404).json('Classes not found.')
  }
})

router.get('/class', (req, res) => {
  const courseSlug = req.query.get("course")
  const classSlug = req.query.get("slug")
  const classTitle = getClass(courseSlug, classSlug)
  if (classTitle) {
    res.status(200).json(classTitle)
  } else {
    res.status(404).json('Class not found.')
  }
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