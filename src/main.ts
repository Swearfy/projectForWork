import * as PIXI from "pixi.js";
import UI from "./ui";
import ShapesFactory from "./shapeFactory";

const MainApp = () => {
  // App
  const app = new PIXI.Application<HTMLCanvasElement>({
    width: 1600,
    height: 600,
    background: "#000000",
  });

  document.body.appendChild(app.view);

  const ui = UI();
  const shapes = ShapesFactory(app, ui);

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

  const gravityDetails = {
    id: "gravity",
    text: "Current Gravity",
    value: 1,
  };
  const spawnRate = {
    id: "spawnRate",
    text: "Current Spawn Rate per second",
    value: 1,
    limit: 0,
  };

  ui.genButtonBox(gravityDetails);
  ui.genButtonBox(spawnRate);

  let passedTime = 0;
  // Main Loop
  app.ticker.add((delta) => {
    let gravity = gravityDetails.value;
    let genRate = spawnRate.value;

    if (genRate >= 1) {
      if (Date.now() > passedTime) {
        passedTime = Date.now() + 1000 / genRate;

        if (gravity > 0) {
          shapes.genShape();
        }
      }
    }

    shapes.update(delta, gravity);
  });
};

MainApp();
