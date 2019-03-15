// const EventEmitter  = require('events');
//
// const url = 'http://mylogger.io/log';
//
// class Logger extends EventEmitter{
//     log(message) {
//         console.log(message);
//         this.emit('messageLogged', {id: 1, url: 'http://'});
//     }
// }
//
// module.exports = Logger;

// Middleware
function log(req, res, next) {
    console.log('Logging...'); // req.body
    next();
}

module.exports = log;