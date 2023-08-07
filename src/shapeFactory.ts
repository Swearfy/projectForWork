import * as PIXI from "pixi.js";
import "@pixi/graphics-extras";
import { Circle } from "./shapes/Circle";
import { Shape } from "./shape";
import { Triangle } from "./shapes/Triangle";
import { Rectangle } from "./shapes/Rectangle";
import { Polygon } from "./shapes/Polygon";
import { Ellipse } from "./shapes/Ellipse";

const ShapesFactory = (
  app: PIXI.Application,
  ui: {
    updateUI: (numberOfShapes: number, totalTakenArea: string) => void;
  }
) => {
  let shapesArray: Shape[] = [];

  const shapeList: string[] = [
    "circle",
    "triangle",
    "4sides",
    "5sides",
    "6sides",
    "ellipse",
  ];

  const getNumberOfShapes = () => {
    const numberOfShapes = shapesArray.length;
    return numberOfShapes;
  };

  const drawPolygon = (
    shape: PIXI.Graphics,
    numberOfSides: number,
    x: number,
    y: number
  ) => {
    // Define the points for the 5-sided polygon
    const radius = 25; // Radius of the polygon

    const angleIncrement = (Math.PI * 2) / numberOfSides;

    shape.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));

    for (let i = 1; i <= numberOfSides; i++) {
      const angle = angleIncrement * i;
      const xPoint = x + radius * Math.cos(angle);
      const yPoint = y + radius * Math.sin(angle);
      shape.lineTo(xPoint, yPoint);
    }

    // Close the polygon
    shape.lineTo(x + radius * Math.cos(0), y + radius * Math.sin(0));
  };

  const genShape = (x = Math.random() * app.view.width, y = -100) => {
    const randomIndex = Math.floor(Math.random() * shapeList.length);
    let shapeName = "5sides";
    let shape = new Shape(x, y);

    switch (shapeName) {
      case "circle":
        shape = new Circle(x, y, 25);

        break;
      case "triangle":
        shape = new Triangle(x, y, 25, 25);
        break;

      case "4sides":
        shape = new Rectangle(x, y, 25, 25);
        break;
      case "5sides":
        shape = new Polygon(x, y, 5, 25);
        // shape.shape.drawShape(new PIXI.Polygon());
        break;
      case "6sides":
        shape = new Polygon(x, y, 6, 25);

        break;
      case "ellipse":
        shape = new Ellipse(x, y, 25, 16);
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
    // if (x - shape.width / 2 < 0 || x + shape.width / 2 > app.view.width) {
    //   return;
    // }

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

    shapesArray.push(shape);
    ui.updateUI(getNumberOfShapes(), calculateArea());
  };

  const calculateArea = () => {
    let sum = 0;
    for (let i = 0; i < shapesArray.length; i++) {
      sum += shapesArray[i].getAreaOfShape();
    }
    return sum.toFixed(2);
  };
  const update = (delta: number, gravity: number) => {
    for (let i = 0; i < shapesArray.length; i++) {
      const shapeObj = shapesArray[i];

      app.stage.addChild(shapeObj.shape);
      shapeObj.shape.y += gravity * delta;

      // Remove shape once out of bound from bottom
      if (shapeObj.shape.y - shapeObj.shape.height / 2 > app.view.height) {
        removeShape(shapeObj);
        ui.updateUI(getNumberOfShapes(), calculateArea());
      }
    }
  };

  const removeShape = (shape: Shape) => {
    app.stage.removeChild(shape.shape);
    let i = shapesArray.indexOf(shape);
    if (shapesArray[i]) {
      shapesArray.splice(i, 1);
    }
  };

  return { update, genShape, getNumberOfShapes };
};

export default ShapesFactory;
