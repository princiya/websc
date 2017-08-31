'use strict';

var configuration = null;
var peerConn;
var dataChannel;

var trail = document.getElementById('trail');
var sendBtn = document.getElementById('send');
sendBtn.addEventListener('click', sendAnswer);
var isInitiator;
var room = window.location.hash.substring(1);
if (!room) {
  room = window.location.hash = randomToken();
}

function getAnswer() {
  const yes = document.getElementById("yes").checked;
  const no = document.getElementById("no").checked;
  if (yes) { return 'yes'; }
  return 'no';
}

function sendAnswer() {
  var answer = getAnswer();
  dataChannel.send(answer);
}

function render(data) {
  var p = document.createElement("p");
  p.innerHTML = data;
  if (data === 'yes') {
    p.style.color = 'green';
  } else {
    p.style.color = 'red'
  }
  trail.appendChild(p);
}

function randomToken() {
  return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
}

function logError(err) {
  console.log(err.toString(), err);
}
