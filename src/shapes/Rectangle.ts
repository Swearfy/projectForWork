import { Shape } from "../shape";

export class Rectangle extends Shape {
  width: number;
  height: number;
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y);
    this.width = width;
    this.height = height;
  }
  draw() {
    this.shape.beginFill(this.color, 1);
    this.shape.drawRect(0, 0, this.width, this.height);
    this.shape.position.set(this.x - this.width / 2, this.y);
    this.shape.endFill();
  }

  getAreaOfShape(): number {
    return this.height * this.width;
  }
}
