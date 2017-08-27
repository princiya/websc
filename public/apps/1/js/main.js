'use strict';

/****************************************************************************
* Initial setup
****************************************************************************/

// var configuration = {
//   'iceServers': [{
//     'urls': 'stun:stun.l.google.com:19302'
//   }]
// };

var configuration = null;
var peerConn;
var dataChannel;

// var roomURL = document.getElementById('url');
var video = document.querySelector('video');
var canvas = document.getElementById('canvas');
var photoContext = canvas.getContext('2d');
var trail = document.getElementById('trail');
var captureBtn = document.getElementById('capture');
var sendBtn = document.getElementById('send');
var startBtn = document.getElementById('start');
var filters = document.getElementById('filters');
var applyFilterBtn = document.getElementById('applyFilters');

var photoContextW;
var photoContextH;
var originalImgUrl;

// Attach event handlers
captureBtn.addEventListener('click', capturePhoto);
sendBtn.addEventListener('click', sendPhoto);
startBtn.addEventListener('click', startWebCamVideo);
applyFilterBtn.addEventListener('click', applyFilters);

// Create a random room if not already present in the URL.
var isInitiator;
var room = window.location.hash.substring(1);
if (!room) {
  room = window.location.hash = randomToken();
}

/**
* Updates URL on the page so that users can copy&paste it to their peers.
*/
// function updateRoomURL(ipaddr) {
//   var url;
//   if (!ipaddr) {
//     url = location.href;
//   } else {
//     url = location.protocol + '//' + ipaddr + ':2013/#' + room;
//   }
//   roomURL.innerHTML = url;
// }

/****************************************************************************
* User media (webcam)
****************************************************************************/

function grabWebCamVideo() {
  console.log('Getting user media (video) ...');
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  })
  .then(gotStream)
  .catch(function(e) {
    alert('getUserMedia() error: ' + e.name);
  });
}

function gotStream(stream) {
  var streamURL = window.URL.createObjectURL(stream);
  console.log('getUserMedia video stream URL:', streamURL);
  window.stream = stream; // stream available to console
  video.src = streamURL;
  video.onloadedmetadata = function() {
    canvas.width = photoContextW = video.videoWidth;
    canvas.height = photoContextH = video.videoHeight;
    console.log('gotStream with with and height:', photoContextW, photoContextH);
  };
  show(captureBtn);
}

function stopWebCamVideo() {
  stream.getVideoTracks()[0].stop();
}

function startWebCamVideo() {
  grabWebCamVideo();
  hide(startBtn, sendBtn, canvas, filters);
  show(camera, captureBtn);
}

/****************************************************************************
* Aux functions, mostly UI-related
****************************************************************************/

function capturePhoto() {
  photoContext.drawImage(video, 0, 0, canvas.width, canvas.height);
  originalImgUrl = canvas.toDataURL();
  show(startBtn, sendBtn, canvas, filters);
  hide(camera, captureBtn);
  stopWebCamVideo();
}

function applyFilters() {
  const saturate = document.getElementById("saturateCheck").checked;
  const saturateValue = parseInt(document.getElementById("saturateText").value) || 50;
  const grayScale = document.getElementById("grayScaleCheck").checked;
  const grayScaleValue = parseInt(document.getElementById("grayScaleText").value) || 50;
  let filter = null;
  if (saturate) {
    filter = `saturate(${saturateValue}%)`;
  }
  if (grayScale) {
    if (filter) {
      filter += ` grayScale(${grayScaleValue}%)`;
    }
    else {
      filter = `grayScale(${grayScaleValue}%)`;
    }
  }
  var imgUrl = originalImgUrl;
  photoContext.clearRect(0, 0, canvas.width, canvas.height);
  const img = new Image();
  img.src = imgUrl;
  img.onload = () => {
    if (filter) {
      photoContext.filter = filter;
    }
    photoContext.drawImage(img, 0, 0);
  };
}

function sendPhoto() {
  // Split data channel message in chunks of this byte length.
  var CHUNK_LEN = 64000;
  console.log('width and height ', photoContextW, photoContextH);
  var img = photoContext.getImageData(0, 0, photoContextW, photoContextH),
  len = img.data.byteLength,
  n = len / CHUNK_LEN | 0;

  console.log('Sending a total of ' + len + ' byte(s)');
  dataChannel.send(len);

  // split the photo and send in chunks of about 64KB
  for (var i = 0; i < n; i++) {
    var start = i * CHUNK_LEN,
    end = (i + 1) * CHUNK_LEN;
    console.log(start + ' - ' + (end - 1));
    dataChannel.send(img.data.subarray(start, end));
  }

  // send the reminder, if any
  if (len % CHUNK_LEN) {
    console.log('last ' + len % CHUNK_LEN + ' byte(s)');
    dataChannel.send(img.data.subarray(n * CHUNK_LEN));
  }
}

function renderPhoto(data) {
  var canvas = document.createElement('canvas');
  canvas.width = photoContextW;
  canvas.height = photoContextH;
  canvas.classList.add('incomingPhoto');
  // trail is the element holding the incoming images
  trail.insertBefore(canvas, trail.firstChild);

  var context = canvas.getContext('2d');
  var img = context.createImageData(photoContextW, photoContextH);
  img.data.set(data);
  context.putImageData(img, 0, 0);
}

function show() {
  Array.prototype.forEach.call(arguments, function(elem) {
    elem.style.display = null;
  });
}

function hide() {
  Array.prototype.forEach.call(arguments, function(elem) {
    elem.style.display = 'none';
  });
}

function randomToken() {
  return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
}

function logError(err) {
  console.log(err.toString(), err);
}
