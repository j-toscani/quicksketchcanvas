import {
  getDistanceFromTo,
  getElementPosition,
} from "./createGetClickCoordinatesOn";
import Rect from "../drawables/Rect";
import Circle from "../drawables/Circle";
import StepHistory from "../abstracts/StepHistory";
import FreeStroke from "../drawables/FreeStroke";
import { getInputs } from "./activateStyleSelect";
import { StylePropertyKey } from "../abstracts/DrawElement";

export type DrawOptions = { rect: Rect; circle: Circle };

function createDrawOptions(canvas: Canvas) {
  return {
    rect: new Rect(canvas, { w: 100, h: 100, fill: "#ff0000", stroke: "#0000ff" }),
    circle: new Circle(canvas, { r: 50, stroke: "#000000", fill: "#00ff00" }),
    free: new FreeStroke(canvas, {
      w: 3,
      stroke: "#ff00ff",
      fill: "#000000",
    }),
  };
}

export default class Canvas extends StepHistory<() => void> {
  ctx: CanvasRenderingContext2D;
  element: HTMLCanvasElement;
  drawOptions: DrawOptions;
  _active: keyof DrawOptions;
  mousePosition: Coordinates;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super();
    this.ctx = ctx;
    this._active = "circle";
    this.element = canvas;
    this.mousePosition = {
      x: 0,
      y: 0,
    };

    this.drawOptions = createDrawOptions(this);
  }

  private get elementPosition(): Coordinates {
    return getElementPosition(this.element);
  }

  get clickPosition(): Coordinates {
    const { dx: x, dy: y } = getDistanceFromTo(
      this.elementPosition,
      this.mousePosition
    );
    return { x, y };
  }

  get active(): keyof DrawOptions {
    return this._active;
  }

  get drawableData() {
    return this.drawOptions[this._active].data;
  }

  set active(value: keyof DrawOptions) {
    this.deselectDrawable(this._active)
    this.selectDrawable(value)
    this.setInputValues();
  }

  deselectDrawable(key: keyof DrawOptions) {
    this.drawOptions[key].deselect();
    this.setButtonActivity(key, false);
  }

  selectDrawable(key: keyof DrawOptions) {
    this.drawOptions[key].select();
    this.setButtonActivity(key);
    this._active = key;
  }

  setInputValues() {
    const inputs = getInputs();
    inputs.forEach(input => {
      const responsibility = input.dataset.style;
      if (responsibility) {
        input.value = this.drawableData[responsibility as StylePropertyKey];
      }
    })
  }

  updatePosition(e: MouseEvent): void {
    this.mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  init(): string {
    this.drawOptions[this.active].select();
    this.active = this._active;
    return this._active;
  }

  private setButtonActivity(key: keyof DrawOptions, active = true): void {
    const button = document.querySelector(`[data-drawable=${key}]`);

    if (button) {
      button.classList[active ? "add" : "remove"]("active");
    }
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
