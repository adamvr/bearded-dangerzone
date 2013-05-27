var template = _.template(
  '<span class="date"><%= new Date() %>' + 
  '<span class="topic"><%= topic %></span>' +
  '<span class="message"><%= message %></span>'
);

var setupClickHandler = function () {
  var publishButton = document.querySelector('#publish');

  publishButton.onclick = function () {
    var topic = document.querySelector('#topic').value
      , message = document.querySelector('#message').value;
    window.socket.emit('publish', topic, message);
  };
};

var setupSockets = function () {
   var socket = io.connect()
    , messages = document.querySelector('#messages');

  socket.on('connect', function () {
    var status = document.querySelector('#status p');
    status.innerText = 'Online';

    socket.emit('subscribe', '/#');
  });

  socket.on('message', function(topic, message) {
    console.log('message received: ', message);
    var element = document.createElement('p');
    element.innerHTML = template({topic: topic, message: message});

    messages.insertBefore(element, messages.firstChild);
  });

  window.socket = socket;
};

window.onload = function() {
  setupSockets();
  setupClickHandler();
};
