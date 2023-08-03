// App UI
const UI = () => {
  // Container
  const uiBox = document.createElement("div");

  const displayNumberOfShapes = document.createElement("a");
  const displaySurfaceArea = document.createElement("a");

  // Placeholder Text
  displayNumberOfShapes.textContent = `Number of shapes ${0}`;
  displaySurfaceArea.textContent = `Area taken by shapes`;

  uiBox.append(displayNumberOfShapes, displaySurfaceArea);

  document.body.before(uiBox);

  // Boiler plate buttons
  const genButtonBox = (x: {
    id: string;
    text: string;
    value: number;
    limit?: number;
  }) => {
    const box = document.createElement("div");
    const minusButton = document.createElement("button");
    minusButton.textContent = `-1`;

    const plusButton = document.createElement("button");
    plusButton.textContent = `+1`;

    minusButton.addEventListener("pointertap", () => {
      if (!x.limit === null) {
        if (x.value > x.limit) {
          x.value -= 1;
          display.textContent = `${x.text} ${x.value}`;
        }
      } else {
        x.value -= 1;
        display.textContent = `${x.text} ${x.value}`;
      }
    });

    plusButton.addEventListener("pointertap", () => {
      if (x.limit) {
        if (x.value >= x.limit) {
          x.value += 1;
          display.textContent = `${x.text} ${x.value}`;
        }
      } else {
        x.value += 1;
        display.textContent = `${x.text} ${x.value}`;
      }
    });

    const display = document.createElement("a");
    display.textContent = `${x.text} ${x.value}`;
    display.id = x.id;

    box.append(display, minusButton, plusButton);
    document.body.after(box);
  };

  // update main ui
  const updateUI = (numberOfShapes: number) => {
    displayNumberOfShapes.textContent = `Number of shapes ${numberOfShapes.toString()}`;
    displaySurfaceArea.textContent = `Area taken by shapes`;
  };

  return {
    updateUI,
    genButtonBox,
  };
};

export default UI;
