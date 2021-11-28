import StepHistory from "./abstracts/StepHistory";
import FreeStroke from "./drawables/FreeStroke";
import { DrawElementStyle } from "./abstracts/DrawElement";
import { MoveDrawable } from "./abstracts/MoveDrawable";
import { ClickDrawable } from "./abstracts/ClickDrawable";

export type DrawableElementObject =
  | MoveDrawable<DrawElementStyle>
  | ClickDrawable<DrawElementStyle>;
export default class Canvas extends StepHistory<DrawableElementObject> {
  ctx: CanvasRenderingContext2D;
  canvasElement: HTMLCanvasElement;
  _chosenElement: new (data?: any) => DrawableElementObject;
  drawnObjects: DrawableElementObject[];

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.ctx = canvas.getContext("2d")!;
    this.canvasElement = canvas;
    this.drawnObjects = [];
    this._chosenElement = FreeStroke;
    this.use(FreeStroke);
  }

  get using() {
    return this.lastAdded.label;
  }

  get lastAdded() {
    return this.drawnObjects[this.drawnObjects.length - 1];
  }

  clear() {
    const { width, height } = this.canvasElement.getBoundingClientRect();
    this.ctx.clearRect(0, 0, width, height);
  }

  use(element: new (data?: any) => DrawableElementObject) {
    this.removeListeners();

    if (new element() instanceof ClickDrawable) {
      this.canvasElement.addEventListener("click", this.clickDraw);
    } else {
      this.canvasElement.addEventListener("mousedown", this.moveStart);
    }

    this._chosenElement = element;
  }

  onHistoryUpdate() {
    this.clear();
    console.log(this.historyStep, this.getHistoryState())
    this.getHistoryState().forEach((step) => step.draw(this.ctx));
  }

  private removeListeners() {
    this.canvasElement.removeEventListener("click", this.clickDraw);
    this.canvasElement.removeEventListener("mousedown", this.moveStart);
    this.canvasElement.removeEventListener("mouseup", this.moveStop);
    this.canvasElement.removeEventListener("mouseleave", this.moveStop);
  }

  private addElement(element: DrawableElementObject) {
    this.drawnObjects.push(element);
  }

  private clickDraw = (e: MouseEvent) => {
    const clickable = this.createClickable();

    clickable.position = clickable.getClickPosition(e);
    clickable.draw(this.ctx);
    this.addElement(clickable);
    this.addToHistory(clickable);
  };

  private moveStart = (e: MouseEvent) => {
    this.canvasElement.addEventListener("mouseup", this.moveStop);
    this.canvasElement.addEventListener("mouseleave", this.moveStop);

    const moveable = this.createMoveable();
    moveable.start(this.ctx, e);
    this.addElement(moveable);

    this.canvasElement.addEventListener("mousemove", this.moveDraw);
  };

  private moveDraw = (e: MouseEvent) => {
    const currentLine = this.lastAdded as FreeStroke;
    currentLine.drawTo(this.ctx, e);
  };

  private moveStop = (_e: MouseEvent) => {
    const currentLine = this.lastAdded as FreeStroke;
    currentLine.stop(this.ctx);

    this.removeListeners();
    this.addToHistory(currentLine);
  };

  private createClickable(): ClickDrawable<DrawElementStyle> {
    return new this._chosenElement();
  }

  private createMoveable(): MoveDrawable<DrawElementStyle> {
    const element = new this._chosenElement();
    if (!(element instanceof MoveDrawable)) {
      throw new Error("The chosen Element ist not an drawable while moving!");
    }
    return element;
  }
}
