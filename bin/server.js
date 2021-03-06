'use strict';

/*
 * Dependencies
 */
const app = require('../app');
const debug = require('debug')('server');
const http = require('http');

const port = normalizePort(process.env.PORT || '1337');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(value) {
  var port = parseInt(value, 10);

  if (port.isNaN) {
    return value;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

/*
 * Events
 */

function onError(err) {
  if (err.syscall !== 'listen') {
    throw err;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (err.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw err;
  }
}

function onListening() {
  var address = server.address();
  var bind = typeof address === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  debug('Listening on: ' + bind);
}
