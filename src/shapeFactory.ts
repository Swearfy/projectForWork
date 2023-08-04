import * as PIXI from "pixi.js";
import "@pixi/graphics-extras";

const ShapesFactory = (
  app: PIXI.Application,
  ui: {
    updateUI: (numberOfShapes: number, totalTakenArea: string) => void;
  }
) => {
  let shapesArray: { shape: PIXI.Graphics; area: number }[] = [];

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

  let areaOfShape: number;
  const genShape = (x = Math.random() * app.view.width, y = -100) => {
    const randomIndex = Math.floor(Math.random() * shapeList.length);
    let shapeName = shapeList[randomIndex];
    let shape = new PIXI.Graphics();
    let color =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    if (color) {
      shape.beginFill(color, 1);
    }

    switch (shapeName) {
      case "circle":
        shape.drawCircle(0, 0, 25);
        shape.position.set(x, y);
        areaOfShape = Math.PI * Math.pow(shape.width / 2, 2);

        break;
      case "triangle":
        let triangleWidth = 50;
        let triangleHeight = 50;
        let triangleHalf = triangleWidth / 2;
        let triangleYHalf = triangleHeight / 2;

        shape.moveTo(triangleWidth, 0);
        shape.lineTo(triangleHalf, triangleHeight);
        shape.lineTo(0, 0);
        shape.lineTo(triangleHalf, 0);

        shape.position.set(x - triangleHalf, y - triangleYHalf);
        break;

      case "4sides":
        shape.drawRect(0, 0, 50, 50);
        shape.position.set(x - shape.width / 2, y);
        areaOfShape = shape.height * shape.width;
        break;
      case "5sides":
        drawPolygon(shape, 5, x, y);
        areaOfShape =
          Math.pow(((5 / 4) * shape.width) / 2, 2) *
          (1 / Math.tan(Math.PI / 5));
        break;
      case "6sides":
        drawPolygon(shape, 6, x, y);
        areaOfShape = (3 * Math.sqrt(3) * Math.pow(shape.width / 2, 2)) / 2;
        break;
      case "ellipse":
        shape.drawEllipse(0, 0, 25, 16);
        shape.position.set(x, y);
        areaOfShape = (((Math.PI * shape.width) / 2) * shape.height) / 2;
        break;
      // case "star":
      //   shape.drawStar(0, 0, 5, 15, 25);
      //   shape.position.set(x, y);
      //   break;
      default:
        break;
    }
    shape.endFill();

    // Check to see if the shape would render outside of app view
    if (x - shape.width / 2 < 0 || x + shape.width / 2 > app.view.width) {
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

    const shapeObj = { shape, area: areaOfShape };
    // Shape event
    shape.eventMode = "static";
    shape.cursor = "pointer";
    shape.on("pointertap", () => {
      removeShape(shapeObj);
      ui.updateUI(getNumberOfShapes(), calculateArea());
    });

    shapesArray.push(shapeObj);
    ui.updateUI(getNumberOfShapes(), calculateArea());
  };

  const calculateArea = () => {
    let sum = 0;
    for (let i = 0; i < shapesArray.length; i++) {
      if (typeof shapesArray[i].area === "number") {
        sum += shapesArray[i].area;
      }
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

  const removeShape = (shapeObj: { shape: PIXI.Graphics; area: number }) => {
    app.stage.removeChild(shapeObj.shape);
    let i = shapesArray.indexOf(shapeObj);
    if (shapesArray[i]) {
      shapesArray.splice(i, 1);
    }
  };

  return { update, genShape, getNumberOfShapes };
};

export default ShapesFactory;
