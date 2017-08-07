/**
 * Module dependencies.
 */

var express = require('express')
  , bodyParser = require('body-parser')
  , routes = require('./routes/index')
  , http = require('http')
  , path = require('path')
  ,logger = require('morgan')
  , cookieParser = require('cookie-parser')

  , debug = require('debug')
  //, basicAuth = require('basic-auth-connect')
  ;
const fileUpload = require('express-fileupload');
  
var app = express();
app.use(fileUpload());
app.use(bodyParser.json());
//app.use(basicAuth('admin', '3ston51LLa'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

console.log("Starting again");
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/scripts',  express.static( path.join(__dirname, '/scripts')));
  app.use('/bower_components',  express.static( path.join(__dirname, '/bower_components')));
  app.use('/stylesheets',  express.static( path.join(__dirname, '/stylesheets')));
  app.use('/views',  express.static( path.join(__dirname, '/views')));
  app.use('/', require('./routes/liikmed'));
  app.use('/', routes);
  app.use('/', require('./routes/saajad'));
  app.use('/', require('./routes/saldo'));
  app.use('/', require('./routes/nouded'));

  

var port = normalizePort(process.env.PORT || '3010');
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