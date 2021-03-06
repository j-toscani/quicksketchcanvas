import StepHistory from "./abstracts/StepHistory";
import FreeStroke from "./drawables/FreeStroke";
import { DrawElementStyle } from "./abstracts/DrawElement";
import { MoveDrawable } from "./abstracts/MoveDrawable";
import { ClickDrawable } from "./abstracts/ClickDrawable";
import { Coordinates, Drawable } from "./types";

export type DrawableElementObject =
  | MoveDrawable<DrawElementStyle>
  | ClickDrawable<DrawElementStyle>;
export default class Canvas extends StepHistory<DrawableElementObject> {
  ctx: CanvasRenderingContext2D;
  drawStyles: DrawElementStyle;
  canvasElement: HTMLCanvasElement;
  _chosenElement: new (data?: any) => Drawable;
  drawnObjects: Drawable[];
  isDrawing: boolean;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.ctx = canvas.getContext("2d")!;
    this.canvasElement = canvas;
    this.drawnObjects = [];
    this.isDrawing = false;
    this._chosenElement = FreeStroke;

    this.drawStyles = {
      fill: "black",
      stroke: "black",
    };

    this.use(FreeStroke);
    this.addListeners();
  }

  get using() {
    return this.lastAdded.label;
  }

  get lastAdded() {
    return this.drawnObjects[this.drawnObjects.length - 1];
  }

  _clear() {
    const { width, height } = this.canvasElement.getBoundingClientRect();
    this.ctx.clearRect(0, 0, width, height);
  }

  clear() {
    this._clear();
    this.history = [];
  }

  use(element: new (data?: any) => Drawable) {
    this._chosenElement = element;
  }

  onHistoryUpdate() {
    this._clear();
    this.getHistoryState().forEach((step) => step.draw(this.ctx));
  }

  onBackupCreate() {}

  handleMouseDown = (e: MouseEvent) => {
    this.isDrawing = true;
    if (!(new this._chosenElement() instanceof MoveDrawable)) {
      this.clickDraw(e);
    } else {
      this.moveStart(e);
    }
  };

  handleMouseLeave = (e: MouseEvent) => {
    this.isDrawing = false;
    this.moveStop(e);
  };

  handleMouseMove = (e: MouseEvent) => {
    if (!this.isDrawing) {
      return;
    }
    if (!(new this._chosenElement() instanceof MoveDrawable)) {
      this.resizeClickable(e);
    } else {
      this.moveDraw(e);
    }
  };

  private addListeners() {
    this.canvasElement.addEventListener("mousemove", this.handleMouseMove);
    this.canvasElement.addEventListener("mousedown", this.handleMouseDown);
    this.canvasElement.addEventListener("mouseup", this.handleMouseLeave);
    this.canvasElement.addEventListener("mouseleave", this.handleMouseLeave);
  }

  private addElement(element: Drawable) {
    this.drawnObjects.push(element);
  }

  private clickDraw = (e: MouseEvent) => {
    const clickable = this.createClickable();

    clickable.position = clickable.getClickPosition(e);
    clickable.draw(this.ctx);

    this.addElement(clickable);
    this.addToHistory(clickable);
  };

  private resizeClickable = (e: MouseEvent) => {
    this._clear();

    this.history.slice(0, -1).forEach((element) => element.draw(this.ctx));

    const element = this.lastAdded as ClickDrawable<any>;
    const { x, y } = element.position;
    const sizes = {
      w: e.offsetX - x,
      h: e.offsetY - y,
    };

    element.updateSizes(sizes);
    element.draw(this.ctx);
  };

  private moveStart = (e: MouseEvent) => {
    const moveable = this.createMoveable();
    moveable.start(this.ctx, e);
    this.addElement(moveable);
  };

  private moveDraw = (e: MouseEvent) => {
    const currentLine = this.lastAdded as FreeStroke;
    currentLine.drawTo(this.ctx, e);
  };

  private moveStop = (_e: MouseEvent) => {
    const currentLine = this.lastAdded;

    if (currentLine instanceof MoveDrawable) {
      currentLine.stop(this.ctx);
      this.addToHistory(currentLine);
    }
  };

  private createClickable(): Drawable {
    return new this._chosenElement({ ...this.drawStyles });
  }

  private createMoveable(): FreeStroke {
    const element = new this._chosenElement({ ...this.drawStyles });
    if (!(element instanceof MoveDrawable)) {
      throw new Error("The chosen Element ist not a drawable while moving!");
    }
    return element;
  }
}
