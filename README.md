## Stream video from your webcam

In this step you'll find out how to:
- Get a video stream from your webcam.
- Manipulate stream playback.
- Use CSS and SVG to manipulate video.

## Exercise
- The `stream` object passed to `getUserMedia()` is in global scope, so you can inspect it from the browser console:
  - open the console
  - type stream and press Return
- What does stream.getVideoTracks() return?
- Try calling stream.getVideoTracks()[0].stop()
- Try adding CSS filters to the video element. For example:
```
video {
  -webkit-filter: blur(4px) invert(1) opacity(0.5);
}
```
- Try adding SVG filters
