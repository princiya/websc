const express = require('express'); // express is a Node.js web application framework
const http = require('http'); // for serving files over http
const path = require('path'); // for handling and transforming file paths
const fs = require('fs'); // for file I/O using standard POSIX functions
const app = express();

process.on('uncaughtException', (err) => {
	 console.log(">> Uncaught exception: "+err);
});

app.use(express.static(path.join(__dirname, 'public'))); // we need to serve static files from the public directory

const port = 5000;
http.createServer(app).listen(port, () => {
  console.log('Express http server listening on port ' + port);
});

module.exports = app;
