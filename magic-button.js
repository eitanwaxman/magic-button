const DOMAIN = "http://localhost:3001/";

const DEFAULT_STYLES = {
  height: "50px",
  width: "100px",
  "background-color": "lightblue",
  "border-radius": "10px",
  cursor: "pointer",
};

const DEFAULT_TEXT = "Click Here";

const DEFAULT_SAMPLE_SIZE = 5;

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
    let url = DOMAIN + "magic-button/click";
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
    let url = DOMAIN + "magic-button/hover";
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

  async init(textOptions, startStyles, lockedStyles, sampleSize) {
    //textOptions ARRAY
    //startStyles OBJECT
    //loackedStyles OBJECT
    //sampleSize NUMBER

    let url = DOMAIN + "magic-button/init";
    let data = {
      textOptions: textOptions || [DEFAULT_TEXT],
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
    let url = DOMAIN + "magic-button/load";
    let response = await fetch(url, {
      headers: { Authentication: id },
    });
    let button = await response.json();
    console.log(button);
    this._id = id;
    this.style.cssText = objectToCSS(button.versions[0].style);
    this.innerHTML = button.versions[0].text;
    this.addClickAction();
    this.addHoverAction();
    return "loaded";
  }
}

customElements.define("magic-button", MagicButton, { extends: "button" });

const button = new MagicButton();

const magicButtonInit = async (
  textOptions,
  startStyles,
  lockedStyles,
  sampleSize
) => {
  let id = await button.init(
    textOptions,
    startStyles,
    lockedStyles,
    sampleSize
  );
  console.log(id);
};

let exampleStartText = ["Start Now", "Free Trial"];

let exampleStartStyles = {
  height: "100px",
  width: "100px",
  "background-color": "red",
  cursor: "pointer",
};

// magicButtonInit(exampleStartText, exampleStartStyles);
button.load("2c55317d-9b61-41f6-aef5-e31bd7452d16");
document.body.append(button);
