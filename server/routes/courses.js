const express = require('express');
const router = express.Router();
const Joi = require('joi');

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

router.get('/', (req, res) => {
  res.send(courses);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.get('/:id', (req, res) => {
  const course = findCourse(req.params.id);

  if (!course) {
    res.status(404).send('Item not found...');
    return;
  }

  res.send(course);
});

router.delete('/:id', (req, res) => {
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

module.exports = router;
