const SERVER_DOMAIN = "https://magic-button.onrender.com/";
//   "http://localhost:3001/"|| ;

const DEFAULT_STYLES = {
  height: "70px",
  width: "200px",
  "background-color": "lightblue",
  "border-radius": "10px",
  "font-size": "2em",
  cursor: "pointer",
};

const DEFAULT_TEXT = "Click Here";

const DEFAULT_COLOR = "lightblue";

const DEFAULT_SAMPLE_SIZE = 10;

const objectToCSS = (object) => {
  let cssText = "";
  Object.keys(object).forEach((property) => {
    let value = object[property];
    cssText += `${property}:${value};`;
  });
  return cssText;
};

class MagicButton extends HTMLButtonElement {
  constructor() {
    super();
    this.style.cssText = objectToCSS(DEFAULT_STYLES);
    this.innerHTML = DEFAULT_TEXT;
    this._id;
  }

  async logClick() {
    let url = SERVER_DOMAIN + "magic-button/click";
    let reqData = {
      id: this._id,
      action: "log-click",
    };
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    let { resData } = await response.json();
    console.log(resData);
  }

  async logHover() {
    let url = SERVER_DOMAIN + "magic-button/hover";
    let reqData = {
      id: this._id,
      action: "log-hover",
    };
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    let { resData } = await response.json();
    console.log(resData);
  }

  addClickAction() {
    this.addEventListener("click", this.logClick);
  }

  addHoverAction() {
    this.addEventListener("pointerover", this.logHover);
  }

  async init(textOptions, colorOptions, startStyles, lockedStyles, sampleSize) {
    //textOptions ARRAY
    //colorOptions ARRAY
    //startStyles OBJECT
    //loackedStyles OBJECT
    //sampleSize NUMBER

    let url = SERVER_DOMAIN + "magic-button/init";
    let data = {
      textOptions: textOptions || [DEFAULT_TEXT],
      colorOptions: colorOptions || [DEFAULT_COLOR],
      startStyles: startStyles || DEFAULT_STYLES,
      lockedStyles: lockedStyles || {},
      sampleSize: sampleSize || DEFAULT_SAMPLE_SIZE,
    };
    console.log(data);
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let { id } = await response.json();
    this._id = id;
    return this._id;
  }

  async load(id) {
    let url = SERVER_DOMAIN + "magic-button/load";
    let response = await fetch(url, {
      headers: { Authentication: id },
    });
    let { currentTest } = await response.json();
    console.log(currentTest);
    this._id = id;
    this.style.cssText = objectToCSS(currentTest.styles);
    this.innerHTML = currentTest.text;
    this.addClickAction();
    this.addHoverAction();
    return this;
  }
}

customElements.define("magic-button", MagicButton, { extends: "button" });
