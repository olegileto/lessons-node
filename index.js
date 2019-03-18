const debug = require('debug')('app:startup'); // Function for debuggers
const config = require('config'); // Create configs and use this function for created configs
const morgan  = require('morgan'); // HTTP request logger middleware for node.js
const helmet = require('helmet'); // Helps secure our apps by setting various HTTP headers
const Joi = require('joi'); // Validation
const logger = require('./logger');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //Our Env variable. We can change it to: Production, Development or Testing
// console.log(`app ${app.get('env')}`);

app.use(express.json()); // req.body
app.use(express.urlencoded({extended: true})); // Middleware function urlencoded(); key=value&key=value
app.use(express.static('public'));
app.use(helmet()); // Helmet is a function

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') { // Check our env: 'Production, Development or Testing machine'
    app.use(morgan('tiny')); // Morgan is a function
    debug('Morgan enabled...'); // Debug function, console.log('Morgan'); === debug('Morgan');
}

// Db works...
// dbDebugger('Connected to the database...');

// Use the Middleware
app.use(logger);

app.use((req, res, next) => {
    console.log('Authenticating...');
    next();
});

const courses = [
    {id: 1, name: 'courses1'},
    {id: 2, name: 'courses2'},
    {id: 3, name: 'courses3'},
];

app.get('/', (req, res) => res.send("Hello World!"));

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
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

app.delete('/api/courses/:id', (req, res) => {
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

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    !course ? res.status(404).send('The id was not found') : res.send(course);
});

app.listen(port, (err) => {
    err ? console.log(`Error: ${err}`) : console.log(`Listening on port: ${port}`);
});