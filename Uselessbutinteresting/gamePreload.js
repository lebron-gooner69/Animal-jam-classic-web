"use strict";

// const { ipcRenderer, contextBridge } = require("electron");

// webview -> renderer
const sendWhitelist = new Set()
  .add("initialized")
  .add("printImage")
  .add("reloadGame")
  .add("reportError")
  .add("signupCompleted");

// renderer -> webview
const receiveWhitelist = new Set()
  .add("flashVarsReady")
  .add("removed");

  // allow renderer process to safely communicate with webview process
  window.ipc = {
    sendToHost: (channel, ...args) => {
      if (sendWhitelist.has(channel)) {
        document.dispatchEvent(new CustomEvent(channel, { detail: args }));
      }
    },
    on: (channel, listener) => {
      if (receiveWhitelist.has(channel)) {
        document.addEventListener(channel, (event) => listener(event.detail));
      }
    }
  };
  

document.addEventListener("redirect-url", (event) => {
  console.log("REDIRECT", event);
});

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("Forcing Offline Login...");
  
//   // Trigger a fake login success event
//   document.dispatchEvent(new CustomEvent("flashVarsReady", {
//       detail: {
//           username: "Thatoneham",
//           token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkwMjlmMzM3OTZjMDM5NDVhNzBjNWIyZGJhODUwM2FlZTAyNjVlZGUiLCJ0eXAiOiJKV1QifQ"
//       }
//   }));
// });
