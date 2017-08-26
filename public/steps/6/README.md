## Take a photo and share it via a data channel

In this step you'll find out how to:

- Take a photo and get the data from it using the canvas element.
- Exchange image data with a remote user.

## How it works

Previously you learned how to exchange text messages using RTCDataChannel.

This step makes it possible to share entire files: in this example, photos captured via getUserMedia().

The core parts of this step are as follows:

- Establish a data channel. Note that you don't add any media streams to the peer connection in this step.
- Capture the user's webcam video stream with getUserMedia()
- When the user clicks the Snap button, get a snapshot (a video frame) from the video stream and display it in a canvas element
- When the user clicks the Send button, convert the image to bytes and send them via a data channel
- The receiving side converts data channel message bytes back to an image and displays the image to the user

## Exercise

- How can you change the code to make it possible to share any file type??

### [Prev](../5)
