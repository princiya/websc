## Use RTCDataChannel to exchange data

In this step you'll find out how to:

- How to exchange data between WebRTC endpoints (peers).

## How it works

- This code uses RTCPeerConnection and RTCDataChannel to enable exchange of text messages.
- Much of the code in this step is the same as for the RTCPeerConnection example.
- The syntax of RTCDataChannel is deliberately similar to WebSocket, with a send() method and a message event.
- Notice the use of dataConstraint. Data channels can be configured to enable different types of data sharing — for example, prioritizing reliable delivery over performance.

## Exercise

- With SCTP, the protocol used by WebRTC data channels, reliable and ordered data delivery is on by default. When might RTCDataChannel need to provide reliable delivery of data, and when might performance be more important — even if that means losing some data?
- Use CSS to improve page layout, and add a placeholder attribute to the "dataChannelReceive" textarea.
- Test the page on a mobile device.
