var socket = io.connect();

socket.on('ipaddr', function(ipaddr) {
  console.log('Server IP address is: ' + ipaddr);
});

socket.on('created', function(room, clientId) {
  isInitiator = true;
});

socket.on('joined', function(room, clientId) {
  isInitiator = false;
  createPeerConnection(isInitiator, configuration);
});

socket.on('full', function(room) {
  alert('Room ' + room + ' is full. We will create a new room for you.');
  window.location.hash = '';
  window.location.reload();
});

socket.on('ready', function() {
  createPeerConnection(isInitiator, configuration);
});

socket.on('log', function(array) {
  console.log.apply(console, array);
});

socket.on('message', function(message) {
  signalingMessageCallback(message);
});

socket.emit('create or join', room);

if (location.hostname.match(/localhost|127\.0\.0/)) {
  socket.emit('ipaddr');
}

function sendMessage(message) {
  socket.emit('message', message);
}
