// Connect to socket server
window.onload = function() {
  var socket = io.connect('http://localhost:3000')
    , messages = document.querySelector('#messages');

  socket.on('connect', function () {
    var status = document.querySelector('#status p');
    status.innerText = 'Online';

    socket.emit('subscribe', '#');
  });

  socket.on('publish', function() {
    messages.
  });
};
