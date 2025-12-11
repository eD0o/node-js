import { Core } from './core/core.ts';
import { createCourse, createClass, getCourses, getCourse, getClasses, getClass } from './core/database.ts';

const core = new Core();

core.router.post('/courses', (req, res) => {
  const { slug, name, description } = req.body;
  const created = createCourse({ slug, name, description })
  if (created) {
    res.status(201).json("Course Created.")
  } else {
    res.status(400).json('Error.')
  }
})

core.router.post('/classes', (req, res) => {
  const { slug, name, courseSlug } = req.body;
  const created = createClass({ slug, name, courseSlug })
  if (created) {
    res.status(201).json("Class Created.")
  } else {
    res.status(400).json('Error.')
  }
})

core.router.get('/courses', (req, res) => {
  const listCourses = getCourses()
  if (listCourses && listCourses.length) {
    res.status(200).json(listCourses)
  } else {
    res.status(404).json('Courses not found.')
  }
})

core.router.get('/course', (req, res) => {
  const slug = req.query.get("slug")
  const course = getCourse(slug)
  if (course) {
    res.status(200).json(course)
  } else {
    res.status(404).json('Course not found.')
  }
})

core.router.get('/classes', (req, res) => {
  const courseSlug = req.query.get("course")
  const listClasses = getClasses(courseSlug)
  if (listClasses && listClasses.length) {
    res.status(200).json(listClasses)
  } else {
    res.status(404).json('Classes not found.')
  }
})

core.router.get('/class', (req, res) => {
  const courseSlug = req.query.get("course")
  const classSlug = req.query.get("slug")
  const classTitle = getClass(courseSlug, classSlug)
  if (classTitle) {
    res.status(200).json(classTitle)
  } else {
    res.status(404).json('Class not found.')
  }
})

core.router.get('/', (req, res) => {
  res.status(200).end('Hello')
})

core.init();