import * as PIXI from "pixi.js";
import "@pixi/graphics-extras";
import { Circle } from "./shapes/Circle";
import { Shape } from "./shape";
import { Triangle } from "./shapes/Triangle";
import { Rectangle } from "./shapes/Rectangle";
import { Polygon } from "./shapes/Polygon";
import { Ellipse } from "./shapes/Ellipse";
import { MainApp } from "./main";
import UI from "./ui";

export default class ShapeFact {
  shapesArray: Shape[];
  shapeList: string[];
  app: PIXI.Application;
  ui: UI;
  constructor(main: MainApp) {
    this.shapesArray = [];
    this.shapeList = [
      "circle",
      "triangle",
      "4sides",
      "5sides",
      "6sides",
      "ellipse",
    ];
    this.app = main.app;
    this.ui = main.ui;
  }

  genShape(x = Math.random() * this.app.view.width, y = -100) {
    const randomIndex = Math.floor(Math.random() * this.shapeList.length);
    let shapeName = this.shapeList[randomIndex];
    let shape = new Shape(x, y, this);

    switch (shapeName) {
      case "circle":
        shape = new Circle(x, y, 25, this);
        break;
      case "triangle":
        shape = new Triangle(x, y, 50, 50, this);
        break;
      case "4sides":
        shape = new Rectangle(x, y, 50, 50, this);
        break;
      case "5sides":
        shape = new Polygon(x, y, 5, 25, this);
        break;
      case "6sides":
        shape = new Polygon(x, y, 6, 25, this);
        break;
      case "ellipse":
        shape = new Ellipse(x, y, 25, 16, this);
        break;
      // case "star":
      //   shape.drawStar(0, 0, 5, 15, 25);
      //   shape.position.set(x, y);
      //   break;
      default:
        break;
    }

    shape.draw();

    // Check to see if the shape would render outside of app view
    if (
      x - shape.shape.width / 2 < 0 ||
      x + shape.shape.width / 2 > this.app.view.width
    ) {
      return;
    }

    // // Fix overlapping To DO
    // for (let i = 0; i < shapesArray.length; i++) {
    //   const shapeOBj2 = shapesArray[i];
    //   if (shapeOBj2) {
    //     let dx = shape.x - shapeOBj2.shape.x;
    //     let dy = shape.y - shapeOBj2.shape.y;
    //     let distance = Math.sqrt(dx * dx + dy * dy);
    //     let distanceLimit = shape.width / 2 + shapeOBj2.shape.width / 2;

    //     if (distance < distanceLimit) {
    //       return;
    //     }
    //   }
    // }

    // Shape event

    this.shapesArray.push(shape);
    this.app.stage.addChild(shape.shape);

    this.ui.updateUI(this.getNumberOfShapes(), this.calculateArea());
  }

  calculateArea() {
    let sum = 0;
    for (let i = 0; i < this.shapesArray.length; i++) {
      sum += this.shapesArray[i].getAreaOfShape();
    }
    return sum.toFixed(2);
  }

  getNumberOfShapes() {
    const numberOfShapes = this.shapesArray.length;
    return numberOfShapes;
  }

  removeShape(shape: Shape) {
    this.app.stage.removeChild(shape.shape);
    let i = this.shapesArray.indexOf(shape);
    if (this.shapesArray[i]) {
      this.shapesArray.splice(i, 1);
      this.ui.updateUI(this.getNumberOfShapes(), this.calculateArea());
    }
  }

  update(delta: number, gravity: number) {
    for (let i = 0; i < this.shapesArray.length; i++) {
      const shapeObj = this.shapesArray[i];

      shapeObj.moveShape(gravity, delta);

      // Remove shape once out of bound from bottom
      if (shapeObj.shape.y - shapeObj.shape.height / 2 > this.app.view.height) {
        this.removeShape(shapeObj);
        // ui.updateUI(this.getNumberOfShapes(), this.calculateArea());
      }
    }
  }
}
