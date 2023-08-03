import * as PIXI from "pixi.js";

const ShapesFactory = (
  app: PIXI.Application,
  ui: {
    updateUI: (numberOfShapes: number) => void;
  }
) => {
  let shapesArray: PIXI.Graphics[] = [];

  const getNumberOfShapes = () => {
    const numberOfShapes = shapesArray.length;
    return numberOfShapes;
  };

  const genShape = (x = Math.random() * app.view.width, y = -100) => {
    let shapeName = "triangle";
    let shape = new PIXI.Graphics();
    let color =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    if (color) {
      shape.beginFill(color, 1);
    }

    switch (shapeName) {
      case "circle":
        shape.drawCircle(0, 0, 50);
        shape.position.set(x, y);
        break;
      case "triangle":
        let triangleWidth = 150;
        let triangleHeight = 150;
        let triangleHalf = triangleWidth / 2;
        let triangleYHalf = triangleHeight / 2;

        shape.moveTo(triangleWidth, 0);
        shape.lineTo(triangleHalf, triangleHeight);
        shape.lineTo(0, 0);
        shape.lineTo(triangleHalf, 0);

        shape.position.set(x - triangleHalf, y - triangleYHalf);
        break;

      default:
        break;
    }
    shape.endFill();

    // Check to see if the shape would render outside of app view
    if (x - shape.width / 2 < 0 || x + shape.width / 2 > app.view.width) {
      return;
    }

    // Fix overlapping To DO
    // for (let i = 0; i < shapesArray.length; i++) {
    //   const shape2 = shapesArray[i];
    //   if (shape2) {
    //     let dx = shape.x - shape2.x;
    //     let dy = shape.y - shape2.y;
    //     let distance = Math.sqrt(dx * dx + dy * dy);
    //     let distanceLimit = shape.width / 2 + shape2.width / 2;

    //     if (distance < distanceLimit) {
    //       console.log(`das`);

    //       return;
    //     }
    //   }
    // }

    // Shape event
    shape.eventMode = "static";
    shape.cursor = "pointer";
    shape.on("pointertap", () => {
      removeShape(shape);
      ui.updateUI(getNumberOfShapes());
    });

    shapesArray.push(shape);
    ui.updateUI(getNumberOfShapes());
  };

  const update = (delta: number, gravity: number) => {
    for (let i = 0; i < shapesArray.length; i++) {
      const shape = shapesArray[i];

      app.stage.addChild(shape);
      shape.y += gravity * delta;

      // Remove shape once out of bound from bottom
      if (shape.y - shape.height / 2 > app.view.height) {
        removeShape(shape);
        ui.updateUI(getNumberOfShapes());
      }
    }
  };

  const removeShape = (shape: PIXI.Graphics) => {
    app.stage.removeChild(shape);
    let i = shapesArray.indexOf(shape);
    if (shapesArray[i]) {
      shapesArray.splice(i, 1);
    }
  };

  return { update, genShape, getNumberOfShapes };
};

export default ShapesFactory;
