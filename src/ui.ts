import * as PIXI from "pixi.js";

// App UI
const UI = (app: PIXI.Application) => {
  const areaOfCanvas = app.view.width * app.view.height;

  // Container
  const uiBox = document.createElement("div");
  uiBox.classList.add("uiBox");

  const displayNumberOfShapes = document.createElement("a");
  const displaySurfaceArea = document.createElement("a");

  // Placeholder Text
  displayNumberOfShapes.textContent = `No of Shapes: ${0}`;
  displaySurfaceArea.textContent = `Area used ${0} px^2, Total area ${areaOfCanvas} px^2`;

  uiBox.append(displayNumberOfShapes, displaySurfaceArea);

  document.body.before(uiBox);

  // Boiler plate buttons
  const genButtonBox = (x: {
    id: string;
    text: string;
    value: number;
    limit: number;
  }) => {
    const box = document.createElement("div");
    const minusButton = document.createElement("button");
    minusButton.textContent = `-1`;

    const plusButton = document.createElement("button");
    plusButton.textContent = `+1`;

    minusButton.addEventListener("click", () => {
      if (x.value > x.limit) {
        x.value -= 1;
        display.textContent = `${x.text} ${x.value}`;
      }
    });

    plusButton.addEventListener("click", () => {
      if (x.value >= x.limit) {
        x.value += 1;
        display.textContent = `${x.text} ${x.value}`;
      }
    });

    const buttonBox = document.createElement("div");

    buttonBox.append(minusButton, plusButton);

    const display = document.createElement("a");
    display.textContent = `${x.text} ${x.value}`;
    box.id = x.id;

    box.append(display, buttonBox);
    box.classList.add("controllsWrapper");
    document.body.after(box);
  };

  // update main ui
  const updateUI = (numberOfShapes: number, totalTakenArea: string) => {
    displayNumberOfShapes.textContent = `No of Shapes: ${numberOfShapes}`;
    displaySurfaceArea.textContent = `Area used ${totalTakenArea} px^2, Total area ${areaOfCanvas} px^2`;
  };

  return {
    updateUI,
    genButtonBox,
  };
};

export default UI;
