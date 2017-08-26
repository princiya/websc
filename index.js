const express = require('express'); // express is a Node.js web application framework
const app = express(); // instance of the express server
const server = require('http').Server(app); // for serving files over http
const io = require('socket.io')(server); //socket.io web socket server
const path = require('path'); // for handling and transforming file paths
const fs = require('fs'); // for file I/O using standard POSIX functions
const os = require('os');

process.on('uncaughtException', (err) => {
	 console.log(">> Uncaught exception from node.js process: "+err);
});

app.use(express.static(path.join(__dirname, 'public'))); // we need to serve static files from the public directory

const port = 5000;
server.listen(port);

// var io = socketIO.listen(app);
io.on('connection', function(socket) {

  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });

	socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    var numClients = io.engine.clientsCount;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    if (numClients === 1) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);
    } else if (numClients === 2) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      // io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready', room);
      socket.broadcast.emit('ready', room);
    } else { // max two clients
      socket.emit('full', room);
    }
  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

	socket.on('bye', function(){
    console.log('received bye');
  });

});

module.exports = app;
