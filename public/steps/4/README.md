## Set up a signaling service to exchange messages

In this step you'll find out how to:

- Run a node server and serve static files
- Set up a messaging service on Node using web sockets
- Use that to create 'rooms' and exchange messages
- Understand *signaling*
- Understand *offer* & *answer* work flow

## Concepts

In order to set up and maintain a WebRTC call, WebRTC clients (peers) need to exchange metadata:

- Candidate (network) information.
- Offer and answer messages providing information about media, such as resolution and codecs.
- In other words, an exchange of metadata is required before peer-to-peer streaming of audio, video, or data can take place. This process is called signaling.

In the previous steps, the sender and receiver RTCPeerConnection objects are on the same page, so 'signaling' is simply a matter of passing metadata between objects.

In a real world application, the sender and receiver RTCPeerConnections run in web pages on different devices, and we need a way for them to communicate metadata.

For this, we use a signaling server: a server that can pass messages between WebRTC clients (peers). The actual messages are plain text: stringified JavaScript objects.

## Exercise

- What alternative messaging mechanisms might be possible? What problems might we encounter using 'pure' WebSocket?
- What issues might be involved with scaling this application? Can you develop a method for testing thousands or millions of simultaneous room requests?
- This app uses a JavaScript prompt to get a room name. Work out a way to get the room name from the URL. For example localhost:8080/foo would give the room name foo.
