/////////////////////////////////////////////

var room = 'foo';
// Could prompt for room name:
// room = prompt('Enter room name:');

var socket = io.connect();

if (room !== '') {
  socket.emit('create or join', room);
  console.log('Attempted to create or  join room', room);
}

socket.on('created', function(room) {
  console.log('Created room ' + room);
});

socket.on('full', function(room) {
  console.log('Room ' + room + ' is full');
});

socket.on('ready', function() {
  console.log('Socket is ready');
  createPeerConnection();
});

socket.on('join', function (room){
  console.log('Another peer made a request to join room ' + room);
  console.log('This peer is the initiator of room ' + room + '!');
});

socket.on('joined', function(room) {
  console.log('joined: ' + room);
  createPeerConnection();
});

socket.on('log', function(array) {
  // console.log.apply(console, array);
});

socket.on('message', function(message) {
  // console.log('Client received message:', message);
  signalingMessageCallback(message);
});

////////////////////////////////////////////////

function sendMessage(message) {
  // console.log('Client sending message: ', message);
  socket.emit('message', message);
}
