const express = require('express');
const router = express.Router(); // Routing between files. Use Express and Router method
const Joi = require('joi'); // Validation

const courses = [
    {id: 1, name: 'courses1'},
    {id: 2, name: 'courses2'},
    {id: 3, name: 'courses3'},
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    !course ? res.status(404).send('The id was not found') : res.send(course);

    // Validate
    // If invalid, return 400 - Bad request
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Update course
    // Return the updated course
    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    !course ? res.status(404).send('The id was not found') : res.send(course);

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validation(course, schema);
}

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    !course ? res.status(404).send('The id was not found') : res.send(course);
});

module.exports = router;