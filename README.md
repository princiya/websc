## Workshop abstract
The web today is a growing universe. Over the years, web technologies have evolved to give web developers the ability to create new generations of useful web experiences. One such feature is WebRTC, which provides browsers and mobile applications with Real Time Communication (RTC) capabilities via simple JavaScript APIs.

In this hands-on workshop you will learn to build applications to support real time communication on the web. You will build an app to get video and take snapshots with your webcam and share them peer-to-peer via WebRTC. Along the way, you'll learn how to use the core WebRTC APIs and set up a messaging server using Node.

## Workshop level
Intermediate

## Workshop takeaways
- Learn to setup a websocket server using Node.js (Prior Node.js knowledge not required)
- Learn about the WebRTC JavaScript APIs
- Build a selfie sharing web app
- Build a baby/pet/visitor monitor
- Build an audio/video chat application

## Blog
[Here](https://princiya777.wordpress.com/category/websc/) is a blog post series for this workshop. While it is possible to do real time communication on the browser with only few lines of JavaScript code, WebRTC is quite complicated with different set of browser APIs and network protocols. Please make some time to do a background reading on this topic via my blog in order to get a good hands-on coding experience during the workshop.

## Resources
- [WebRTC Tutorial](https://github.com/googlecodelabs/webrtc-web)
- [WebRTC Samples](https://github.com/webrtc/samples)

## Get started!
- Clone this repo
- Run `npm install`
- Go to `/public/tutorial` and follow the tutorial steps
- Go to `/public/apps` to try out different WebRTC apps
- To run a tutorial step or an app please follow the below instructions:
  - Open a terminal window and run `node index.js`
  - Open a browser window/tab and run `localhost:5000/tutorial/1` (for tutorial)
  - Open a browser window/tab and run `localhost:5000/apps/1` (for apps)
  - To see WebRTC features, open browser console and see the logged results
  - To see data sharing via WebRTC, open another browser window/tab with the same above url

_To report any problem, please file an issue in this repo. Thank you!_

_Disclaimer: I don't intend to violate any copyright/license laws. This work is a compilation of my notes along with the help from various sources on the internet for the Web Summer Camp, Croatia 2017._
