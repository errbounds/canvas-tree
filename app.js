import Tree, { raf } from "./tree.js";
import data from "./data.js";

class App {
  constructor() {
    // canvas initialize
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    window.addEventListener("resize", this.resize.bind(this));
    this.canvas.addEventListener("click", this.onclick.bind(this));

    // button initialize
    this.lightMode = true;
    this.setBtn();

    // tree
    this.treeId = 0;

    this.resize();
  }

  resize() {
    // canvas resize
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    // tree animation clear
    raf.forEach((tree) => cancelAnimationFrame(tree));
    raf.length = 0;
    this.treeId = 0;

    // canvas clear
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  onclick(event) {
    this.getData();
    const { clientX } = event;
    const tree = new Tree(clientX, this.canvas.height, this.treeId++);

    tree.draw(this.ctx, this.lightMode);
  }

  setBtn() {
    this.refreshBtn = document.getElementById("refresh");
    this.refreshBtn.addEventListener("click", this.resize.bind(this));

    this.lightModeBtn = document.getElementById("light-mode");
    this.lightModeBtn.addEventListener(
      "click",
      this.lightBtnHandler.bind(this)
    );

    this.darkModeBtn = document.getElementById("dark-mode");
    this.darkModeBtn.addEventListener("click", this.darkBtnHandler.bind(this));
  }

  lightBtnHandler() {
    if (!this.lightMode) {
      this.lightModeBtn.classList.remove("show");
      this.darkModeBtn.classList.add("show");
      this.canvas.classList.remove("black");
      this.refreshBtn.classList.remove("white");
      document.getElementById("panel").classList.remove("white");
      this.lightMode = true;
    }
  }
  darkBtnHandler() {
    if (this.lightMode) {
      this.darkModeBtn.classList.remove("show");
      this.lightModeBtn.classList.add("show");
      this.canvas.classList.add("black");
      this.refreshBtn.classList.add("white");
      document.getElementById("panel").classList.add("white");

      this.lightMode = false;
    }
  }

  getData() {
    const fixedLength = document.getElementById("fixedLength").value;
    const lengthWeigth = document.getElementById("lengthWeight").value;
    const maxDepth = document.getElementById("maxDepth").value;

    data.fixedLength = parseInt(fixedLength);
    data.lengthWeight = parseInt(lengthWeigth);
    data.maxDepth = parseInt(maxDepth);
  }
}

window.onload = () => {
  new App();
};
