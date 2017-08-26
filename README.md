## Workshop abstract
The web today is a growing universe. Over the years, web technologies have evolved to give web developers the ability to create new generations of useful web experiences. One such feature is WebRTC, which provides browsers and mobile applications with Real Time Communication (RTC) capabilities via simple JavaScript APIs.

In this hands-on workshop you will learn to build applications to support real time communication on the web. You will build an app to get video and take snapshots with your webcam and share them peer-to-peer via WebRTC. Along the way, you'll learn how to use the core WebRTC APIs and set up a messaging server using Node.

## Workshop level
Intermediate

## Workshop takeaways
- Learn to setup a websocket server using Node.js (Prior Node.js knowledge not required)
- Learn about the WebRTC JavaScript APIs
- Build a selfie sharing web app
- Convert selfie to a gif
- Convert selfie to an ascii image
- Build a baby/pet/visitor monitor
- Build an audio/video chat application

## Blog

[Here](https://princiya777.wordpress.com/category/websc/) is a blog post series for this workshop. While it is possible to do real time communication on the browser with only few lines of JavaScript code, WebRTC is quite complicated with different set of browser APIs and network protocols. Please make some time to do a background reading on this topic via my blog in order to get a good hands-on coding experience during the workshop.

## Activity #1 - Selfie sharing

Please follow the below instructions and make sure you have the working environment set. For any errors, please file issues here. Thank you!

This is a simple app to click selfies and share with friends using web sockets, getUserMedia() and node.js.

- This is a peer-to-peer architecture
- Peer A runs and captures your selfie
- Any subsequent peer(s) connected can have access to this selfie
- This is made possible using the WebRTC architecture and setup

### To run the app do the following:

- Clone the repository
- `npm install`
- `node websocket` (creates a web socket server on port 3000)
- `node index` (creates a node express server on port 5000)
- Open a browser and run `localhost:5000/server/serverCamera.html`
- Open another browser or a new tab on the same browser and run `localhost:5000/client/clientImage.html`
