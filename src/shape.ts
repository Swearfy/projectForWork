import * as PIXI from "pixi.js";

export class Shape {
  x: number;
  y: number;
  color: string;
  shape: PIXI.Graphics;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.color =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    this.shape = new PIXI.Graphics();
    this.shape.eventMode = "static";
    this.shape.on("pointertap", () => {
      console.log("yes");

      //  removeShape(shapeObj);
      //  ui.updateUI(getNumberOfShapes(), calculateArea());
    });
  }
  draw() {}
  getAreaOfShape(): number {
    return 0;
  }
}
