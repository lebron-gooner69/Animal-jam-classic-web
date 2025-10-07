"use strict";

(() => {
  const originalDispatch = EventTarget.prototype.dispatchEvent;
  customElements.define("ajd-game-screen", class extends HTMLElement {
    constructor() {
      super();

      this.blankPageString = "data:text/plain,";

      this.retrying = false;

      this.attachShadow({mode: "open"}).innerHTML = `
        <style>
          :host {
            --game-width: 900px;
            --game-height: 550px;
            --game-scale: 1;
            --button-tray-scale: 1.25;
          }
          @media (min-aspect-ratio: 900 / 550) {
            :host {
              --game-width: calc(900 / 550 * 100vh);
              --game-height: 100vh;
              --game-scale: calc(550px / 100vh);
            }
          }
          @media (max-aspect-ratio: 900 / 550) {
            :host {
              --game-width: 100vw;
              --game-height: calc(550 / 900 * 100vw);
              --game-scale: calc(900px / 100vw);
            }
          }

          .hidden {
            opacity: 0;
          }

          #floating-button-tray {
            left: 99%;
            top: calc(-12% * var(--button-tray-scale));
            width: calc(var(--game-height) * 0.13 * var(--button-tray-scale));
            height: calc(var(--game-height) * 0.12 * var(--button-tray-scale));
            position: relative;
            z-index: 1;
            transition-property: left, opacity;
            transition-duration: 0.2s, 0.3s;
          }

          #floating-button-tray.hidden {
            left: 150vw;
          }

          #floating-button-tray.expanded {
            left: calc(91% + (100vw - var(--game-width)) / 2);
          }

          /* The size of the border elements break when the long side of the window
          is more than about 3.5 times the short side   */
          #game-frame-container {
            width: 100%;
            height: 100%;
            display: grid;
            grid-template: 1fr var(--game-height) 1fr/1fr var(--game-width) 1fr;
            grid-template-areas: ". top ."
                                "left game right"
                                ". bottom .";
          }

          #game-frame-container.logged-out {
            grid-template-areas: "left game right"
                                ". bottom .";

          }

          .border-spiral-background {
            width: 100%;
            height: 100%;
            background-image: url(images/frame/spiralTile.svg);
            object-fit: cover;
            pointer-events: none;
          }

          #border-top {
            grid-area: top;
            object-position: 0 100%;
          }

          /* Adjusted size by 1px because of rounding error in Chrome :( */
          #border-top-background {
            grid-area: top;
            width: calc(100% + 2px);
            height: calc(100% + 1px);
            background: linear-gradient(270deg, #2a4f71, #4483b3);
            margin-left: -1px;
            margin-top: -1px;
          }

          #border-right {
            object-fit: cover;
            object-position: 0 0;
            width: 100%;
            height: 100%;
          }

          #border-right-background {
            grid-area: right;
            width: calc(100% + 1px);
            height: calc(100% + 2px);
            background: linear-gradient(0deg, #2a4f71, #4483b3);
            margin-top: -1px;
          }

          #docked-button-tray {
            background-color: blue;
            display: flex;
            flex-direction: column;
            position: absolute;
            height: 11vh;
            width: 12vh;
            left: 0vh;
            bottom: 2vh;
          }

          #border-right-container {
            position: relative;
            grid-area: right;
          }

          #border-bottom {
            grid-area: bottom;
            object-position: 0 0;
          }

          #border-bottom-background {
            grid-area: bottom;
            border: none;
            width: calc(100% + 2px);
            height: calc(100% + 2px);
            margin-left: -1px;
            margin-top: -1px;
            background: linear-gradient(270deg, #2a4f71, #4483b3);
          }

          #border-left {
            grid-area: left;
            object-position: 100% 0;
          }

          #border-left-background {
            grid-area: left;
            width: calc(100% + 1px);
            height: calc(100% + 2px);
            background: linear-gradient(0deg, #2a4f71, #4483b3);
            margin-left: -1px;
            margin-top: -1px;
          }

          #flash-game-container {
            grid-area: game;
            width: 100%;
            height: 100%;
            background-color: black;
          }

          webview {
            transition: opacity 0.75s;
          }

          webview.hidden {
            opacity: 0;
          }

        </style>
        <div id="game-frame-container" class="logged-out">
          <div id="game-background"></div>
          <img id="border-top-background"></img>
          <img id="border-top" src="images/frame/standAlone_woodTop.svg" class="border-spiral-background"></img>
          <img id="border-bottom-background"></img>
          <img id="border-bottom" src="images/frame/standAlone_woodBtm.svg" class="border-spiral-background"></img>
          <img id="border-left-background"></img>
          <img id="border-left" src="images/frame/standAlone_woodLeft.svg" class="border-spiral-background"></img>
          <img id="border-right-background"></img>
          <div id="border-right-container">
            <img id="border-right" src="images/frame/standAlone_woodRight.svg" class="border-spiral-background"></img>
            <div id="docked-button-tray" class="hidden">
            </div>
          </div>
          <div id="flash-game-container">
            <iframe plugins preload="gamePreload.js" style="height: 100%; width: 100%;"></iframe>
            <ajd-game-button-tray id="floating-button-tray">
            </ajd-game-button-tray>
          </div>
        </div>
      `;
      
      this.webViewElem = this.shadowRoot.querySelector("iframe");
      this.gameFrameElem = this.shadowRoot.getElementById("game-frame-container");

      this.webViewElem.addEventListener("dragover", event => {
        event.preventDefault();
        return false;
      }, false);
      this.webViewElem.addEventListener("drop", event => {
        event.preventDefault();
        return false;
      }, false);

      // redirect all navigation to desktop client
      this.webViewElem.addEventListener("will-navigate", event => {
        this.closeGame();
      });

      this.webViewElem.addEventListener("did-get-redirect-request", event => {
        this.closeGame();
      });

      // open new windows in native browser
      this.webViewElem.addEventListener("new-window", event => {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent("openExternal", {url: event.url}));
      });

      document.addEventListener("toggleDevTools", () => {
        // NOTE: toggleDevTools() is not available on webViewElem
        if (this.webViewElem.isDevToolsOpened()) {
          this.webViewElem.closeDevTools();
        }
        else {
          this.webViewElem.openDevTools();
        }
      });

      // EventTarget.prototype.dispatchEvent = function(event) {
      //   console.log(`Dispatched Event: ${event.type}`, event);
      //   return originalDispatch.call(this, event);
      // };

      EventTarget.prototype.dispatchEvent = async function(event) {
        //console.log(event.type)
        switch (event.type) {
          case "signupCompleted": {
            const {username, password} = event.args[0];
            this.dispatchEvent(new CustomEvent("accountCreated", {detail: {username, password}}));

            try {
              const {flashVars, userData} = await globals.authenticateWithPassword(username, password);

              const data = {
                username: userData.username,
                authToken: userData.authToken,
                refreshToken: userData.refreshToken,
                accountType: userData.accountType,
                language: userData.language,
                rememberMe: true,
              };

              this.dispatchEvent(new CustomEvent("newAccountLoggedIn", {detail: data}));
              this.dispatchEvent(new CustomEvent("loginSucceeded", data));

              this.loadGame(flashVars);
            }
            catch (err) {
              globals.genericError(`Failed to log in after account creation: ${err}`);
            }
            break;
          }
          case "initialized": {
            console.log("over here")
            setTimeout(() => {
              document.getElementById("game-screen").classList.add("no-transition-delays");
            }, 1000);
            document.getElementById("game-screen").shadowRoot.getElementById("game-frame-container").classList.remove("logged-out");
            document.getElementById("game-screen").dispatchEvent(new CustomEvent("gameLoaded"));
          } break;
          case "reloadGame": {
            const reloadSwf = event.args[0];
            if (reloadSwf) {
              if (event.args[1] && (event.args[1].ip || event.args[1].sessionId)) {
                const reloadData = event.args[1];
                globals.reloadFlashVars = {};
                if (reloadData.ip) {
                  globals.reloadFlashVars.smartfoxServer = reloadData.ip;
                  globals.reloadFlashVars.blueboxServer = reloadData.ip;
                }
                if (reloadData.sessionId) {
                  globals.reloadFlashVars.gameSessionId = reloadData.sessionId;
                }
              }
              this.reloadGame();
            }
            else {
              this.closeGame();
            }
          } break;
          case "reportError": {
            globals.reportError("gameClient", event.args[0]);
          } break;
          case "printImage": {
            const imageData = event.args[0];
            this.dispatchEvent(new CustomEvent("systemCommand", {command: "print", width: imageData.width, height: imageData.height, image: imageData.image}));
          } break;
        } 
        return originalDispatch.call(this, event);
      };

      this.dockedContainerElem = this.shadowRoot.getElementById("docked-button-tray");
      this.floatingContainerElem = this.shadowRoot.getElementById("floating-button-tray");
      this.floatingContainerElem.addEventListener("logoutClicked", event => {
        this.closeGame();
      });
      const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          this.floatingContainerElem.expandable = false;
          this.floatingContainerElem.expanded = true;
        }
        else {
          this.floatingContainerElem.expandable = true;
        }
      }, {
        root: null,
        rootMargin: "-6%",
        threshold: 0.0,
      });
      observer.observe(this.dockedContainerElem);
    }

    loadGame(flashVars) {
      console.log("loadGame");
      // prevent race condition with reloads
      if (this.closeGameTimeout) {
        clearTimeout(this.closeGameTimeout);
        this.closeGameTimeout = null;
        this.resetWebView();
      }

      this.webViewElem.classList.remove("hidden");
      // flashVars.clientURL = "http://localhost:1025/gameClient/game/ajclient1713.swf";
      // flashVars.content = "http://localhost:1025/gameClient/game/";
      globals.vars = flashVars;
      console.log(globals.config.gameWebClient);
      this.webViewElem.src = globals.config.gameWebClient;//globals.config.gameWebClient;
      Object.defineProperty(navigator, "userAgent", {
        get: function () {
          return "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Electron/9.0.0 AJClassicStage/9.9.9";
        },
        configurable: true
      });
      this.webViewElem.onload = function(){
        const frame = document.getElementById("game-screen").shadowRoot.querySelector("iframe");
        const floatingcont = document.getElementById("game-screen").shadowRoot.getElementById("floating-button-tray");
        console.log("over here")
        if (globals.config.showTools) {
          frame.openDevTools();
        }
        frame.contentDocument.dispatchEvent(new CustomEvent("flashVarsReady", {detail: flashVars}));
        if (flashVars.webRefPath !== "create_account") {
          floatingcont.expanded = true;
        }
      };
      //
      // setTimeout(() => {
      //   console.log("here")
      //   document.dispatchEvent(new CustomEvent("flashVarsReady", flashVars));
      // }, 1000);
      // setTimeout(() => {
      //   console.log("DOMContentLoaded");
      //   if (globals.config.showTools) {
      //     document.getElementById("game-screen").shadowRoot.getElementById("game-frame-container").openDevTools();
      //   }
      //  document.dispatchEvent(new CustomEvent("flashVarsReady", flashVars));
      //   if (flashVars.webRefPath !== "create_account") {
      //     this.floatingContainerElem.expanded = true;
      //   }

      // },4000);
      // Sometimes loading the URL just fails, retry once then display an oops
      document.getElementById("game-screen").shadowRoot.getElementById("game-frame-container").addEventListener("did-fail-load", event => {
        if (this.retrying) {
          if (!event.validatedURL.includes("/welcome")) {
            this.dispatchEvent(new CustomEvent("loadFailed"));
            globals.genericError(`Web view failed to load url: ${globals.config.gameWebClient}`);
          }
        }
        else {
          this.retrying = true;
          setTimeout(() => {
            this.loadGame(flashVars);
          }, 50);
        }
      }, {once: true});
    }

    reloadGame() {
      this.closeGame();
      globals.reloadGame();
    }

    // TODO: make this transition better
    closeGame() {
      this.webViewElem.classList.add("hidden");
      this.retrying = false;
      this.closeGameTimeout = setTimeout(this.resetWebView.bind(this), 1000);
      this.floatingContainerElem.expanded = true;
      this.floatingContainerElem.expandable = true;
      this.classList.remove("no-transition-delays");
      this.classList.remove("show");
    }

    resetWebView() {
      if (this.webViewElem) {
        this.webViewElem.src = this.blankPageString;
      }
      if (this.gameFrameElem) {
        this.gameFrameElem.classList.add("logged-out");
      }
      this.closeGameTimeout = null;
    }

    async localize() {
      await this.floatingContainerElem.localize();
    }
  });
})();
