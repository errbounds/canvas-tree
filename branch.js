import data from "./data.js";
export default class Branch {
  constructor(startX, startY, endX, endY, id) {
    this.id = id;
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.frame = 12;

    this.currentFrame = 0;

    this.gapX = (this.endX - this.startX) / this.frame;
    this.gapY = (this.endY - this.startY) / this.frame;

    this.currentX = this.startX;
    this.currentY = this.startY;
  }
  // finished?: true
  draw(ctx, depth, lightMode) {
    if (this.currentFrame >= this.frame) {
      return true;
    }

    // console.log(`${this.currentFrame}, ${this.depth}`);
    // console.log(lightMode);
    this.currentX += this.gapX;
    this.currentY += this.gapY;

    ctx.lineWidth = data.maxDepth - depth;
    ctx.strokeStyle = lightMode ? "black" : "white";
    ctx.beginPath();

    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.currentX, this.currentY);

    ctx.closePath();
    ctx.stroke();

    this.currentFrame += 1;
    return false;
  }
}
