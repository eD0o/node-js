import { Core } from './core/core.ts';
import { getCourse } from './core/database.ts';

const core = new Core();

core.router.get('/course/:slug', (req, res) => {
  const { slug } = req.params
  console.log(slug)
  const course = getCourse(slug)
  if (course) {
    res.status(200).json(course)
  } else {
    res.status(404).json('Course not found.')
  }
})


core.router.get('/class/:class', (req, res) => {
  res.status(200).json('Class')
})

core.router.get('/', (req, res) => {
  res.status(200).json('Hello')
})

core.init();