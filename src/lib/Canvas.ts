import {
  getDistanceFromTo,
  getElementPosition,
} from "./createGetClickCoordinatesOn.js";
import Rect from "../drawables/Rect.js";
import Circle from "../drawables/Circle.js";

export type DrawOptions = { rect: Rect; circle: Circle };

function createDrawOptions(canvas: Canvas) {
  return {
    rect: new Rect(canvas, { w: 100, h: 100, style: "black" }),
    circle: new Circle(canvas, { r: 50, stroke: "black", fill: "white" }),
  };
}

export default class Canvas {
  ctx: CanvasRenderingContext2D;
  element: HTMLCanvasElement;
  drawOptions: DrawOptions;
  _active: keyof DrawOptions;
  mousePosition: Coordinates;
  history: (() => void)[];
  _historyStep: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.drawOptions = createDrawOptions(this);
    this._active = "circle";
    this.element = canvas;
    this.history = [];
    this._historyStep = 0;
    this.mousePosition = {
      x: 0,
      y: 0,
    };
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

  set active(value: keyof DrawOptions) {
    this.drawOptions[this._active].deselect();
    this.setButtonActivity(this._active, false);

    if (Object.prototype.hasOwnProperty.call(this.drawOptions, value)) {
      this.drawOptions[value].select();
      this._active = value;
    }

    this.setButtonActivity(value);
  }

  get historyStep():number {
    return this._historyStep;
  }

  set historyStep(step: number) {
    this._historyStep = step;
    this.drawHistory();
  }

  updatePosition(e: MouseEvent): void {
    this.mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  addToHistory(drawFunction: () => void): void {
    if (this.historyStep < 0) {
      this.history = this.history.slice(this.historyStep);
      this.historyStep = 0;
    }
    this.history.push(drawFunction);
  }

  revert(): void {
    this.historyStep -= 1;
  }

  restore():void {
    this.historyStep += 1;
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

  private drawHistory(): void {
    this.clear();

    const historyState = this.history.slice(0, this.historyStep);
    historyState.forEach((element) => element());
  }

  private clear(): void {
    const { width, height } = this.element.getBoundingClientRect();
    this.ctx.clearRect(0, 0, width, height);
  }
}
