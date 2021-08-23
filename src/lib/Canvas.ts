import Rect from "../drawables/Rect";
import Circle from "../drawables/Circle";
import StepHistory from "../abstracts/StepHistory";
import FreeStroke from "../drawables/FreeStroke";
import { Drawable } from "../types";

function createDrawOptions(canvas: Canvas) {
  return {
    rect: new Rect({ w: 100, h: 100, fill: "red", stroke: "blue" }),
    circle: new Circle({ r: 50, stroke: "white", fill: "green" }),
    free: new FreeStroke(canvas, {
      w: 3,
      stroke: "yellow",
      fill: "transparent",
    }),
  };
}

export type DrawOptions = ReturnType<typeof createDrawOptions>;

export default class Canvas extends StepHistory<() => void> {
  ctx: CanvasRenderingContext2D;
  element: HTMLCanvasElement;
  drawOptions: DrawOptions;
  active: Drawable;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super();
    this.ctx = ctx;
    this.element = canvas;

    this.drawOptions = createDrawOptions(this);
    this.active = this.drawOptions["circle"];
  }

  setActive(value: keyof DrawOptions) {
    this.drawOptions[value].deselect(this.element);
    this.setButtonActivity(value, false);

    if (Object.prototype.hasOwnProperty.call(this.drawOptions, value)) {
      this.drawOptions[value].select(this.element);
    }
    this.active = this.drawOptions[value];
    this.setButtonActivity(value);
  }

  init(): Drawable {
    this.active.select(this.element);
    return this.active;
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
    this.drawHistory();
  }

  drawHistory(): void {
    this.clear();

    const historyState = this.getHistoryState();
    historyState.forEach((element) => element());
  }
}
