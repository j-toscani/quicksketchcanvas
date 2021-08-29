import Rect from "../drawables/Rect";
import Circle from "../drawables/Circle";
import StepHistory from "../abstracts/StepHistory";
import FreeStroke from "../drawables/FreeStroke";
import { Drawable } from "../types";
import { StylePropertyKey } from "../abstracts/DrawElement";
import { getInputs } from "./activateStyleSelect";

function createDrawOptions() {
  return {
    rect: new Rect({ w: 100, h: 100, fill: "red", stroke: "blue" }),
    circle: new Circle({ r: 50, stroke: "white", fill: "green" }),
    free: new FreeStroke({
      w: 3,
      stroke: "#ff00ff",
      fill: "#000000",
    }),
  };
}

export type DrawOptions = ReturnType<typeof createDrawOptions>;

export default class Canvas extends StepHistory<() => void> {
  ctx: CanvasRenderingContext2D;
  element: HTMLCanvasElement;
  drawOptions: DrawOptions;
  active: Drawable;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.ctx = canvas.getContext("2d")!;
    this.element = canvas;

    this.drawOptions = createDrawOptions();
    this.active = this.drawOptions["free"];
  }

  deselectDrawable() {
    this.active.removeCanvas(this.element);
    this.deactivateButtons();
  }

  selectDrawable(key: keyof DrawOptions) {
    this.deselectDrawable();

    this.active = this.drawOptions[key];

    this.active.setCanvas(this.element);
    this.activateButton(key);
  }

  setInputValues() {
    const inputs = getInputs();
    inputs.forEach((input) => {
      const responsibility = input.dataset.style;
      if (responsibility) {
        input.value = this.active.data[responsibility as StylePropertyKey];
      }
    });
  }

  init(): Drawable {
    this.active.setCanvas(this.element);
    return this.active;
  }

  private activateButton(key: keyof DrawOptions): void {
    const button = document.querySelector(`[data-drawable=${key}]`);
    if (button) {
      button.classList.add("active");
    }
  }

  private deactivateButtons() {
    const buttons = document.querySelectorAll("[data-drawable]");
    buttons.forEach((button) => button.classList.remove("active"));
  }

  private clear(): void {
    const { width, height } = this.element.getBoundingClientRect();
    this.ctx.clearRect(0, 0, width, height);
  }

  onHistoryUpdate(): void {
    // this.drawHistory();
  }

  drawHistory(): void {
    this.clear();

    const historyState = this.getHistoryState();
    historyState.forEach((element) => element());
  }
}
