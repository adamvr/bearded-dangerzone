
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , socketio = require('socket.io')
  , mqtt = require('mqtt');

// Express server
var app = express();

// Http server
var server = http.createServer(app);

// Socket.io
var io = socketio.listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

io.sockets.on('connection', function(socket) {
  var client = mqtt.createClient();

  socket.on('publish', function(topic, message) {
    client.publish(topic, message);
  });
  socket.on('subscribe', function (topic) {
    client.subscribe(topic);
  });
  client.on('message', function(topic, message) {
    socket.emit('message', topic, message);
  });
});

server.listen(app.get('port'));
