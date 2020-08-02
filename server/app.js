const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
  { 'id': 1,
    'name': 'course1'
  },
  { 'id': 2,
    'name': 'course2'
  },
  { 'id': 3,
    'name': 'course3'
  }
];

app.get('/', (req, res) => {
  res.send('You are on the base');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/course/:id', (req, res) => {
  const course = findCourse(req.params.id);

  if (!course) {
    res.status(404).send('Item not found...');
    return;
  }

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

app.get('/api/course/:id', (req, res) => {
  const course = findCourse(req.params.id);

  if (!course) {
    res.status(404).send('Item not found...');
    return;
  }

  res.send(course);
});

app.delete('/api/course/:id', (req, res) => {
  const course = findCourse(req.params.id);

  if (!course) {
    res.status(404).send('Item not found...');
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string()
    .min(3)
    .required(),
    id: Joi.number()
  });

  return schema.validate(course);
}

function findCourse(id) {
  return courses.find( c => c.id === parseInt(id));
}

app.listen('3000', () => console.log('listening...'));

