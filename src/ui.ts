export default class UI {
  areaOfCanvas: number;
  uiBox: HTMLElement;
  displayNoOfShapes: HTMLElement;
  displaySurfaceArea: HTMLElement;
  constructor(areaOfCanvas: number) {
    this.areaOfCanvas = areaOfCanvas;
    this.uiBox = document.createElement("div");
    this.displayNoOfShapes = document.createElement("a");
    this.displaySurfaceArea = document.createElement("a");
  }

  init() {
    this.uiBox.classList.add("uiBox");

    // Placeholder Text
    this.displayNoOfShapes.textContent = `No of Shapes: ${0}`;
    this.displaySurfaceArea.textContent = `Area used ${0} px^2, Total area ${
      this.areaOfCanvas
    } px^2`;

    this.uiBox.append(this.displayNoOfShapes, this.displaySurfaceArea);

    document.body.before(this.uiBox);
  }

  genButtonBox(x: { id: string; text: string; value: number; limit: number }) {
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
  }

  updateUI(numberOfShapes: number, totalTakenArea: string) {
    this.displayNoOfShapes.textContent = `No of Shapes: ${numberOfShapes}`;
    this.displaySurfaceArea.textContent = `Area used ${totalTakenArea} px^2, Total area ${this.areaOfCanvas} px^2`;
  }
}

// const areaOfCanvas = app.view.width * app.view.height;
