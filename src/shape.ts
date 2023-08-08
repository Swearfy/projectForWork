import * as PIXI from "pixi.js";
import ShapeFact from "./shapeFactory";

export class Shape {
  x: number;
  y: number;
  color: string;
  shape: PIXI.Graphics;
  main: ShapeFact;
  constructor(x: number, y: number, main: ShapeFact) {
    this.x = x;
    this.y = y;
    this.main = main;
    this.color =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    this.shape = new PIXI.Graphics();
    this.shape.eventMode = "static";
    this.shape.cursor = "pointer";
    this.shape.on("pointertap", () => {
      this.main.removeShape(this);
    });
  }
  moveShape(gravity: number, delta: number) {
    this.shape.y += gravity * delta;
  }
  draw() {}
  getAreaOfShape(): number {
    return 0;
  }
}
