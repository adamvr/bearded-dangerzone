var template = _.template(
  '<span class="date"><%= new Date() %></span>' +
  '<span class="topic"><%= topic %></span>' +
  '<span class="message"><%= message %></span>' 
);


var setupClickHandler = function () {
  var publishButton = document.querySelector('#publish')
    , topic = document.querySelector('#pub-topic')
    , message = document.querySelector('#message');

  publishButton.onclick = function () {
    window.socket.emit('publish', topic.value, message.value);
  };
};

var setupSockets = function () {
  var messages = document.querySelector('#message-list');

  var socket = window.socket = io.connect();
  socket.on('connect', function () {
    var status = document.querySelector('span.status');
    status.className = 'status online';
    status.innerText = 'Online';

    socket.emit('subscribe', '#');
  });

  socket.on('message', function(topic, message) {
    console.log('message received: ', message);

    var m = document.createElement('p');

    m.innerHTML = template({topic: topic, message: message});
    messages.insertBefore(m, messages.firstChild);
  });
};

window.onload = function() {
  setupSockets();
  setupClickHandler();
};
