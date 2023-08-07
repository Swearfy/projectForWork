import { Shape } from "../shape";

export class Circle extends Shape {
  radius: number;
  constructor(x: number, y: number, radius: number) {
    super(x, y);
    this.radius = radius;
  }

  draw() {
    this.shape.beginFill(this.color, 1);
    this.shape.drawCircle(0, 0, this.radius);
    this.shape.position.set(this.x, this.y);
    this.shape.endFill();
    console.log(this.color);
  }

  getAreaOfShape(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}
