import { Shape } from "../shape";

export class Polygon extends Shape {
  radius: number;
  angleIncr: number;
  noOfSides: number;
  constructor(x: number, y: number, noOfSides: number, radius: number) {
    super(x, y);
    this.radius = radius;
    this.angleIncr = (Math.PI * 2) / noOfSides;
    this.noOfSides = noOfSides;
  }

  draw() {
    this.shape.moveTo(
      this.x + this.radius * Math.cos(0),
      this.y + this.radius * Math.sin(0)
    );

    for (let i = 1; i <= this.noOfSides; i++) {
      const angle = this.angleIncr * i;
      const xPoint = this.x + this.radius * Math.cos(angle);
      const yPoint = this.y + this.radius * Math.sin(angle);
      this.shape.lineTo(xPoint, yPoint);
    }
    this.shape.endFill();
  }

  getAreaOfShape(): number {
    if (this.noOfSides === 5) {
      return (
        Math.pow(((5 / 4) * this.radius) / 2, 2) * (1 / Math.tan(Math.PI / 5))
      );
    }

    if (this.noOfSides === 6) {
      return (3 * Math.sqrt(3) * Math.pow(this.radius, 2)) / 2;
    }

    return 0;
  }
}
