import { Shape } from "../shape";
import ShapeFact from "../shapeFactory";

export class Circle extends Shape {
  radius: number;
  constructor(x: number, y: number, radius: number, main: ShapeFact) {
    super(x, y, main);
    this.radius = radius;
  }

  draw() {
    this.shape.beginFill(this.color, 1);
    this.shape.drawCircle(0, 0, this.radius);
    this.shape.position.set(this.x, this.y);
    this.shape.endFill();
  }

  getAreaOfShape(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}
