## Workshop abstract
The web today is a growing universe. Over the years, web technologies have evolved to give web developers the ability to create new generations of useful web experiences. One such feature is WebRTC, which provides browsers and mobile applications with Real Time Communication (RTC) capabilities via simple JavaScript APIs.

In this hands-on workshop you will learn to build applications to support real time communication on the web. You will build an app to get video and take snapshots with your webcam and share them peer-to-peer via WebRTC. Along the way, you'll learn how to use the core WebRTC APIs and set up a messaging server using Node.

## Workshop level
Intermediate

## Workshop takeaways
- Learn to setup a websocket server using Node.js (Prior Node.js knowledge not required)
- Learn about the WebRTC JavaScript APIs
- Build a selfie sharing web app
- Build an audio/video chat application

## Selfie sharing

This is a simple app to click selfies and share with friends using web sockets, getUserMedia() and node.js.

- This is a client - server architecture
- Server runs and captures your selfie
- Any client(s) connected can have access to this selfie
- This is made possible using web sockets

### To run the app do the following:

- Clone the repository
- `npm install`
- `node websocket` (creates a web socket server on port 3000)
- `node app` (creates a node express server on port 5000)
- Open a browser and run `localhost:5000/server/serverCamera.html`
- Open a browser and run `localhost:5000/client/clientImage.html`
