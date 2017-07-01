/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , http = require('http')
  , path = require('path')
  ,logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , debug = require('debug')
  , basicAuth = require('basic-auth-connect');

var app = express();
app.use(basicAuth('admin', '3ston51LLa'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("Starting again");
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/scripts',  express.static( path.join(__dirname, '/scripts')));
  app.use('/bower_components',  express.static( path.join(__dirname, '/bower_components')));
  app.use('/stylesheets',  express.static( path.join(__dirname, '/stylesheets')));
  app.use('/views',  express.static( path.join(__dirname, '/views')));
  app.use('/', routes);
  

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
  module.exports = app;