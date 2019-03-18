const debug = require('debug')('app:startup'); // Function for debuggers
const config = require('config'); // Create configs and use this function for created configs
const morgan = require('morgan'); // HTTP request logger middleware for node.js
const helmet = require('helmet'); // Helps secure our apps by setting various HTTP headers
const logger = require('./middleware/logger'); // Middleware logger
const courses = require('./routes/courses'); // Module courses
const home = require('./routes/home'); // Module home
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug'); // View template
app.set('views', './views'); // default

app.use(express.json()); // req.body
app.use(express.urlencoded({extended: true})); // Middleware function urlencoded(); key=value&key=value
app.use(express.static('public'));
app.use(helmet()); // Helmet is a function
app.use('./api/courses', courses); // Our router from courses.js
app.use('/', home); // Our router from home.js

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

if (app.get('env') === 'development') { // Check our env: 'Production, Development or Testing machine'
    app.use(morgan('tiny')); // Morgan is a function
    debug('Morgan enabled...'); // Debug function, console.log('Morgan'); === debug('Morgan');
}

// Use the Middleware
app.use(logger);

app.use((req, res, next) => {
    console.log('Authenticating...');
    next();
});

app.listen(port, (err) => {
    err ? console.log(`Error: ${err}`) : console.log(`Listening on port: ${port}`);
});