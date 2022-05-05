import Branch from "./branch.js";
import data from "./data.js";

export const raf = [];

export default class Tree {
  constructor(posX, posY, id) {
    this.posX = posX;
    this.posY = posY;
    this.id = id;
    this.branches = new Array(data.maxDepth).fill(0).map(() => []);
    // console.log(new Array(data.maxDepth));
    this.drawCurrentDepth = 0;
    raf.push(0);

    this.createBranch(
      posX,
      posY,
      90 + (Math.random() * 5 - 2.5),
      Math.random() * 50 + 70,
      0
    );
  }

  createBranch(startX, startY, angle, length, depth) {
    // create branch
    if (depth >= data.maxDepth) {
      return 0;
    }
    const endX = startX + length * this.cos(angle);
    const endY = startY - length * this.sin(angle);
    this.branches[depth].push(new Branch(startX, startY, endX, endY, this.id));

    // new branches init
    const rAngle = angle + (Math.random() * 15 + 10);
    const lAngle = angle - (Math.random() * 15 + 10);

    const rLength =
      data.fixedLength *
      Math.random() *
      data.lengthWeight *
      ((data.maxDepth - depth) / data.maxDepth);
    const lLength =
      data.fixedLength *
      Math.random() *
      data.lengthWeight *
      ((data.maxDepth - depth) / data.maxDepth);

    this.createBranch(endX, endY, rAngle, rLength, depth + 1);
    this.createBranch(endX, endY, lAngle, lLength, depth + 1);
  }

  // finished?: true
  draw(ctx, lightMode) {
    if (this.drawCurrentDepth === data.maxDepth) {
      cancelAnimationFrame(raf[this.id]);
      return true;
    }

    console.log(this.drawCurrentDepth, data.maxDepth);
    const finished = this.branches[this.drawCurrentDepth].map((branch) =>
      branch.draw(ctx, this.drawCurrentDepth, lightMode)
    );
    if (finished.every((branch) => branch)) {
      this.drawCurrentDepth++;
    }
    raf[this.id] = requestAnimationFrame(this.draw.bind(this, ctx, lightMode));

    return false;
  }

  cos(deg) {
    return Math.cos((Math.PI / 180) * deg);
  }
  sin(deg) {
    return Math.sin((Math.PI / 180) * deg);
  }
}
