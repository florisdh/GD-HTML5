import Base from "./base";

class Mars extends Base {
  constructor(options, gameData) {
    super(options, gameData);
    this._init();
  }
  _init() {
    // css
    const css = this._css(this.options, this.gameData);
    this._insertCss(css);

    // html
    const html = this._html(this.options, this.gameData);
    const { container, splashContainer } = this._insertHtml(html);

    this._root = container;
    this._container = container;
    this._splashContainer = splashContainer;

    // register events
    this._registerEvents();

    // this.on("playClick", () => {
    //   console.log("CLICKED PLAY");
    // });
  }
  _css(options, gameData) {
    let thumbnail = this._getThumbnail(options, gameData);
    /* eslint-disable */
    const css = `
            body {
                position: inherit;
            }
            .${this.options.prefix}splash-background-container {
                box-sizing: border-box;
                position: absolute;
                z-index: 664;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow:hidden;
                /*Carbon Fibre*/
                background:
                  radial-gradient(black 15%, transparent 16%) 0 0,
                  radial-gradient(black 15%, transparent 16%) 8px 8px,
                  radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
                  radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;
                background-color:#282828;
                background-size:16px 16px;

                /* Carbon
                background:
                  linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
                  linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
                  linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
                  linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
                  linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
                  linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424);
                background-color: #131313;
                background-size: 20px 20px;   
                */             
            }
            .${this.options.prefix}sdk-version{
                position:absolute;
                right:0;
                top:0;  
                color:white;
                font-size:12px;
                padding-top:6px;                 
                padding-right:6px;            
            }
            .${this.options.prefix}splash-container {
                display: flex;
                flex-flow: column;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                left:0;
                width: 100%;
                height: 100%;
                overflow-y: auto;
            }

            .${this.options.prefix}splash-top {
                display: flex;
                flex-flow: column;
                box-sizing: border-box;
                flex: 1;
                align-self: center;
                justify-content: center;
            }

            .${this.options.prefix}splash-bottom {
              display: flex;
              flex-flow: column;
              box-sizing: border-box;
              align-self: center;
              justify-content: center;
              width: 100%;
              padding-left:6px;
              padding-right:6px;
              padding-bottom:6px;
            }

            .${this.options.prefix}splash-top > div {
                text-align: center;
            }

            .${this.options.prefix}splash-top > div > button {
                margin: auto;
                padding: 8px;
                border-radius: 5px;
                border:0;
                background: linear-gradient(0deg, #21A179, #1C8464);
                color: white;
                text-transform: uppercase;
                text-shadow: 0 0 1px #fff;
                font-family: Helvetica, Arial, sans-serif;
                font-weight: bold;
                font-size: 18px;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                width: 150px;
            }

            .${this.options.prefix}splash-top > div > button:hover {
                background: linear-gradient(0deg, #1C8464, #21A179);
            }

            .${this.options.prefix}splash-top > div > button:active {
                box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
                background: linear-gradient(0deg, #1C8464, #15674E);
            }
            
            .${this.options.prefix}splash-top > div > div {
                position: relative;
                width: 150px;
                height: 150px;
                margin: auto auto 12px;
                border-radius: 5px;
                overflow: hidden;
                border: 2px solid rgba(255, 255, 255, 0.8);
                box-shadow: inset 0 5px 5px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3);
                background-image: url(${thumbnail});
                background-position: center;
                background-size: cover;
            }
            .${this.options.prefix}splash-bottom > .${this.options.prefix}splash-consent,
            .${this.options.prefix}splash-bottom > .${this.options.prefix}splash-title {
                box-sizing: border-box;
                width: 100%;
                color: #fff;
                text-align: justify;
                font-size: 12px;
                font-family: Arial;
                font-weight: normal;
                line-height: 150%;
            }
            .${this.options.prefix}splash-bottom > .${this.options.prefix}splash-title {
                text-align: center;
                font-size: 18px;
                font-family: Helvetica, Arial, sans-serif;
                font-weight: bold;
                line-height: 100%;
                text-transform: uppercase;
            }
            .${this.options.prefix}splash-bottom > .${this.options.prefix}splash-consent a {
                color: #fff;
            }
        `;

    return css;
  }

  _html(options, gameData) {
    const { isConsentDomain } = options;
    // If we want to display the GDPR consent message.
    // If it is a SpilGame, then show the splash without game name.
    // SpilGames all reside under one gameId. This is only true for their older games.
    /* eslint-disable */
    let html = "";
    let consentStyle = isConsentDomain ? "display:block" : "display:none";

    html = `
                <div class="${this.options.prefix}splash-background-container">
                  <div class="${this.options.prefix}sdk-version">${this.options.version}</div>
                  <div class="${this.options.prefix}splash-container">
                      <div class="${this.options.prefix}splash-top">
                          <div>
                            <div></div>
                            <button id="${this.options.prefix}splash-button">Play</button>
                          </div>   
                      </div>
                      <div class="${this.options.prefix}splash-bottom">
                          <div class="${this.options.prefix}splash-title">${gameData.title}</div>
                          <div class="${this.options.prefix}splash-consent" style=${consentStyle}>
                              We may show personalized ads provided by our partners, and our 
                              services can not be used by children under 16 years old without the 
                              consent of their legal guardian. By clicking "PLAY", you consent 
                              to transmit your data to our partners for advertising purposes and 
                              declare that you are 16 years old or have the permission of your 
                              legal guardian. You can review our terms
                              <a href="https://docs.google.com/document/d/e/2PACX-1vR0BAkCq-V-OkAJ3EBT4qW4sZ9k1ta9K9EAa32V9wlxOOgP-BrY9Nv-533A_zdN3yi7tYRjO1r5cLxS/pub" target="_blank">here</a>.
                          </div>
                      </div>
                  </div>       
                </div>
            `;

    return html;
  }

  _insertHtml(html) {
    // Create our container and add the markup.
    const container = document.createElement("div");
    container.innerHTML = html;
    container.id = `${this.options.prefix}splash`;

    // Flash bridge SDK will give us a splash container id (splash).
    // If not; then we just set the splash to be full screen.
    const splashContainer = this.options.flashSettings.splashContainerId
      ? document.getElementById(this.options.flashSettings.splashContainerId)
      : null;
    if (splashContainer) {
      splashContainer.style.display = "block";
      splashContainer.insertBefore(container, splashContainer.firstChild);
    } else {
      const body = document.body || document.getElementsByTagName("body")[0];
      body.insertBefore(container, body.firstChild);
    }

    return { container, splashContainer };
  }
}

export default Mars;
