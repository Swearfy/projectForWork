import * as PIXI from "pixi.js";

const MainApp = () => {
  // App
  const app = new PIXI.Application<HTMLCanvasElement>({
    width: 600,
    height: 400,
    background: "#000000",
  });

  document.body.appendChild(app.view);

  const gravity = 1;
  const shapes = ShapesFactory(app, gravity);

  // Background init
  const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
  bg.width = app.view.width;
  bg.height = app.view.height;
  bg.tint = "#000000";

  // Background event
  bg.eventMode = "static";
  bg.cursor = "pointer";
  bg.on("pointerdown", (e) => {
    shapes.genShape(e.clientX, e.clientY);
  });

  app.stage.addChild(bg);

  let genRate = 1;
  let passedTime = 0;

  // Main Loop
  app.ticker.add((delta) => {
    if (Date.now() > passedTime) {
      passedTime = Date.now() + 1000 / genRate;

      shapes.genShape();
    }
    shapes.update(delta);
  });
};

const ShapesFactory = (app: PIXI.Application, gravity: number) => {
  let shapesArray: PIXI.Graphics[] = [];

  const genShape = (x = Math.random() * app.view.width, y = -100) => {
    const shape = new PIXI.Graphics();
    shape.beginFill("#FFFFFF").drawCircle(0, 0, 50).endFill();

    // Check to see if the shape would render outside of app view
    if (x - shape.width / 2 < 0 || x + shape.width / 2 > app.view.width) {
      genShape();
      return;
    }

    shape.position.set(x, y);

    // Shape event
    shape.eventMode = "static";
    shape.cursor = "pointer";
    shape.on("click", () => {
      removeShape(shape);
    });

    shapesArray.push(shape);
  };

  const update = (delta: number) => {
    for (let i = 0; i < shapesArray.length; i++) {
      const shape = shapesArray[i];

      app.stage.addChild(shape);
      shape.y += gravity * delta;

      // Remove shape once out of bound from bottom
      if (shape.y - shape.height / 2 > app.view.height) {
        removeShape(shape);
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

  return { update, genShape };
};

MainApp();
