const fixedLength = 50;
const maxDepth = 11;

class App {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    window.addEventListener("resize", this.resize.bind(this));
    this.canvas.addEventListener("click", this.onclick.bind(this));
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.resize();
  }

  resize() {
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  onclick(event) {
    const { clientX } = event;
    const tree = new Tree(clientX, this.canvas.height);

    tree.draw(this.ctx);
  }
}

class Tree {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.branches = [];

    this.createBranch(
      posX,
      posY,
      90 + (Math.random() * 5 - 2.5),
      Math.random() * 30 + 70,
      0
    );
  }

  createBranch(startX, startY, angle, length, depth) {
    if (depth > maxDepth) {
      return 0;
    }
    const endX = startX + length * this.cos(angle);
    const endY = startY - length * this.sin(angle);

    this.branches.push(new Branch(startX, startY, endX, endY, depth));

    // new branches
    const rAngle = angle + (Math.random() * 15 + 10);
    const lAngle = angle - (Math.random() * 15 + 10);

    const rLength =
      fixedLength * Math.random() * 2 * ((maxDepth - depth) / maxDepth);
    const lLength =
      fixedLength * Math.random() * 2 * ((maxDepth - depth) / maxDepth);

    this.createBranch(endX, endY, rAngle, rLength, depth + 1);
    this.createBranch(endX, endY, lAngle, lLength, depth + 1);
  }

  draw(ctx) {
    this.branches.forEach((branch) => branch.draw(ctx));
  }
  cos(deg) {
    return Math.cos((Math.PI / 180) * deg);
  }
  sin(deg) {
    return Math.sin((Math.PI / 180) * deg);
  }
}

class Branch {
  constructor(startX, startY, endX, endY, depth) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.depth = depth;
  }
  draw(ctx) {
    ctx.beginPath();

    ctx.lineWidth = maxDepth - this.depth;
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);

    ctx.closePath();
    ctx.stroke();
  }
}

window.onload = () => {
  new App();
};
