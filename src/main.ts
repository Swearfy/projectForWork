import * as PIXI from "pixi.js";
import UI from "./ui";
import ShapesFactory from "./shapeFactory";
import "./styles/style.scss";

interface UiDetails {
  id: string;
  text: string;
  value: number;
  limit: number;
}

export class MainApp {
  width: number;
  height: number;
  background: string;
  app: PIXI.Application<HTMLCanvasElement>;
  gravityDetails: UiDetails;
  spawnRate: UiDetails;
  shapes: ShapesFactory;
  ui: UI;

  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
    this.background = "#000000";
    this.app = new PIXI.Application<HTMLCanvasElement>({
      width: this.width,
      height: this.height,
      background: this.background,
    });

    this.gravityDetails = {
      id: "gravity",
      text: "Current Gravity",
      value: 1,
      limit: 0,
    };
    this.spawnRate = {
      id: "spawnRate",
      text: "Current Spawn Rate per second",
      value: 1,
      limit: 0,
    };

    this.ui = new UI(this.app.view.width * this.app.view.height);
    this.shapes = new ShapesFactory(this);
  }

  init() {
    document.body.append(this.app.view);
    this.backgroundInit();
    this.ui.init();
    this.ui.genButtonBox(this.gravityDetails);
    this.ui.genButtonBox(this.spawnRate);
    this.animate();
  }

  backgroundInit() {
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = this.app.view.width;
    bg.height = this.app.view.height;
    bg.tint = "#000000";

    // Background event
    bg.eventMode = "static";
    bg.cursor = "pointer";
    bg.on("pointerdown", (e) => {
      this.shapes.genShape(e.clientX, e.clientY - 50);
    });

    this.app.stage.addChild(bg);
  }

  animate() {
    let passedTime = 0;

    this.app.ticker.add((delta) => {
      let gravity = this.gravityDetails.value;
      let genRate = this.spawnRate.value;

      if (genRate >= 1) {
        if (Date.now() > passedTime) {
          passedTime = Date.now() + 1000 / genRate;

          if (gravity > 0) {
            this.shapes.genShape();
          }
        }
      }

      this.shapes.update(delta, gravity);
    });
  }
}

const app = new MainApp(window.innerWidth, (window.innerHeight * 75) / 100);
app.init();
// const ui = UI(app);
// const shapes = ShapesFactory(app, ui);

// ui.genButtonBox(gravityDetails);
// ui.genButtonBox(spawnRate);
