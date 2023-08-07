import { Shape } from "../shape";

export class Ellipse extends Shape {
  width: number;
  height: number;
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y);
    this.width = width;
    this.height = height;
  }

  draw(): void {
    this.shape.beginFill(this.color, 1);
    this.shape.drawEllipse(0, 0, this.width, this.height);
    this.shape.position.set(this.x, this.y);
    this.shape.endFill();
  }
  getAreaOfShape(): number {
    return (((Math.PI * this.width) / 2) * this.height) / 2;
  }
}
