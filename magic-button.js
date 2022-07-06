const DOMAIN = "http://localhost:3001/";

const objectToCSS = (object) => {
  let cssText = "";
  Object.keys(object).forEach((property) => {
    let value = object[property];
    cssText += `${property}:${value};`;
  });
  return cssText;
};

defaultStyles = {
  height: "50px",
  width: "100px",
  "background-color": "lightblue",
  cursor: "pointer",
};

defaultText = "Click Here";

class MagicButton extends HTMLButtonElement {
  constructor() {
    super();
    this.style.cssText = objectToCSS(defaultStyles);
    this.innerHTML = defaultText;
    this._onClick = () => console.log("click");
    this._onHover = () => console.log("hover");
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

  addClickAction() {
    this.addEventListener("click", this._onClick);
    this.addEventListener("click", this.logClick);
  }

  addHoverAction() {
    this.addEventListener("pointerover", this._onHover);
    // this.addEventListener("pointerover", this._onHover);
  }

  async init(data) {
    let url = DOMAIN + "magic-button/init";
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
    this.addClickAction();
    return "loaded";
  }
}

customElements.define("magic-button", MagicButton, { extends: "button" });

const button = new MagicButton();

const magicButtonInit = async (options) => {
  let id = await button.init(options);
  console.log(id);
};
let exampleInitData = {
  height: "100px",
  width: "100px",
  "background-color": "red",
  cursor: "pointer",
};

// magicButtonInit(exampleInitData);
button.load("a3bb5036-e9ea-403a-b517-7935f9e93643");
document.body.append(button);

setTimeout(() => {
  console.log(button._id);
}, 3000);
