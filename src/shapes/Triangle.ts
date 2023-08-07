import { Shape } from "../shape";

export class Triangle extends Shape {
  width: number;
  height: number;
  halfWidth: number;
  halfHeight: number;
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.halfWidth = width / 2;
    this.halfHeight = height / 2;
  }
  draw() {
    this.shape.beginFill(this.color, 1);
    this.shape.moveTo(this.width, 0);
    this.shape.lineTo(this.halfWidth, this.halfHeight);
    this.shape.lineTo(0, 0);
    this.shape.lineTo(this.halfWidth, 0);
    this.shape.position.set(this.x, this.y);
    this.shape.endFill();
  }
}
