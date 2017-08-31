var configuration = null;//{ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
var pc;

// call start() to initiate
function createPeerConnection() {
    pc = new RTCPeerConnection(configuration);

    // send any ice candidates to the other peer
    pc.onicecandidate = function (event) {
        // sendMessage(JSON.stringify({ candidate: evt.candidate }));
        // console.log('pc.icecandidate event: ', event);
        if (event.candidate) {
          sendMessage({
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate
          });
        } else {
          console.log('End of candidates.');
        }
    };

    // let the "negotiationneeded" event trigger offer generation
    pc.onnegotiationneeded = function () {
        pc.createOffer().then(function (offer) {
            return pc.setLocalDescription(offer);
        })
        .then(function () {
            // send the offer to the other peer
            // signalingChannel.send(JSON.stringify({ desc: pc.localDescription }));
            sendMessage(pc.localDescription);
        })
        .catch(logError);
    };

    // once remote track arrives, show it in the remote video element
    pc.ontrack = function (evt) {
      console.log('pc.ontrack event', evt);
        // don't set srcObject again if it is already set.
        // if (!remoteVideo.srcObject)
          remoteVideo.srcObject = evt.streams[0];
    };

    /* pc.onaddstream = function (evt) {
      console.log('pc.ontrack event', evt);
        // don't set srcObject again if it is already set.
        // if (!remoteVideo.srcObject)
          remoteVideo.srcObject = evt.streams[0];
    }; */

    // get a local stream, show it in a self-view and add it to be sent
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(function (stream) {
            localVideo.srcObject = stream;
            pc.addTrack(stream.getAudioTracks()[0], stream);
            pc.addTrack(stream.getVideoTracks()[0], stream);
            // pc.addStream(stream);
        })
        .catch(logError);
}

function signalingMessageCallback(evt) {
    if (!pc)
        createPeerConnection();

    console.log('socket.onmessage: ', evt);
    if (evt.type === "offer") {
        pc.setRemoteDescription(evt).then(function () {
            return pc.createAnswer();
        })
        .then(function (answer) {
            return pc.setLocalDescription(answer);
        })
        .then(function () {
            // var str = JSON.stringify({ desc: pc.localDescription });
            // signalingChannel.send(str);
            sendMessage(pc.localDescription);
        })
        .catch(logError);
    } else if (evt.type === "answer") {
        pc.setRemoteDescription(evt).catch(logError);
    } else if (evt.type === "candidate") {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: evt.label,
        candidate: evt.candidate
      });
      pc.addIceCandidate(candidate).catch(logError);
    }
    else {
        log("Unsupported SDP type. Your code may differ here.");
    }


    /*var message = JSON.parse(evt.data);
    if (message.desc) {
        var desc = message.desc;

        // if we get an offer, we need to reply with an answer
        if (desc.type == "offer") {
            pc.setRemoteDescription(desc).then(function () {
                return pc.createAnswer();
            })
            .then(function (answer) {
                return pc.setLocalDescription(answer);
            })
            .then(function () {
                // var str = JSON.stringify({ desc: pc.localDescription });
                // signalingChannel.send(str);
                sendMessage(pc.localDescription);
            })
            .catch(logError);
        } else if (desc.type == "answer") {
            pc.setRemoteDescription(desc).catch(logError);
        } else {
            log("Unsupported SDP type. Your code may differ here.");
        }
    } else {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });
      pc.addIceCandidate(candidate).catch(logError);
    }*/
};

function logError(error) {
    console.log(error.name + ": " + error.message);
}
