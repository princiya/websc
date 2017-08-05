var WebSocketServer = require('ws').Server;

var port = 3000;
var wss = new WebSocketServer({port: port});
var clients = [];

wss.on('connection', function(client) {
	clients.push(client);
	client.on('message', function(message, flags) {
    	clients.forEach(function(client) {
			try {
				client.send(message);
			} catch(notOpenEx) {
				//console.log('Error from websocket: ', notOpenEx);
			}
		});
    });
});

console.log("Websocket server listening on port number "+port);
