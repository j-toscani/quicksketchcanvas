import Rect from "./drawables/Rect";
import Circle from "./drawables/Circle";
import StepHistory from "./abstracts/StepHistory";
import FreeStroke from "./drawables/FreeStroke";
import { DrawElementStyle } from "./abstracts/DrawElement";
import { MoveDrawable } from "./abstracts/MoveDrawable";
import { ClickDrawable } from "./abstracts/ClickDrawable";

type DrawableElementObject =
  | MoveDrawable<DrawElementStyle>
  | ClickDrawable<DrawElementStyle>;
export default class Canvas extends StepHistory<DrawableElementObject> {
  ctx: CanvasRenderingContext2D;
  element: HTMLCanvasElement;
  readonly _chosenElement: new (data: any) =>
    | MoveDrawable<DrawElementStyle>
    | ClickDrawable<DrawElementStyle>;
  drawnObjects: (
    | MoveDrawable<DrawElementStyle>
    | ClickDrawable<DrawElementStyle>
  )[];

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.ctx = canvas.getContext("2d")!;
    this.element = canvas;
    this.drawnObjects = [];
    this._chosenElement = Rect;
  }

  init() {
    this.element.addEventListener("mousedown", this.moveStart);
    this.element.addEventListener("mouseup", this.moveStop);
  }

  get lastAdded() {
    return this.drawnObjects[this.drawnObjects.length - 1];
  }

  private addElement(element: DrawableElementObject) {
    this.drawnObjects.push(element);
  }

  clickDraw = (e: MouseEvent) => {
    const clickable = this.createClickable();

    clickable.position = clickable.getClickPosition(e);
    clickable.draw(this.ctx);
    this.addElement(clickable);
  };

  moveStart = (e: MouseEvent) => {
    try {
      const moveable = this.createMoveable();
      moveable.start(this.ctx, e);
      this.addElement(moveable);

      this.element.addEventListener("mousemove", this.moveDraw);
    } catch (error) {
      console.error(error);
      alert("Please choose a different Element to draw.");
    }
  };

  moveDraw = (e: MouseEvent) => {
    const currentLine = this.lastAdded as FreeStroke;
    currentLine.drawTo(this.ctx, e);
  };

  moveStop = (_e: MouseEvent) => {
    const currentLine = this.lastAdded as FreeStroke;
    currentLine.stop(this.ctx);

    this.element.removeEventListener("mousemove", this.moveDraw);
  };

  onHistoryUpdate() {
    this.drawnObjects.forEach((object) => {
      object.draw(this.ctx);
    });
  }

  private createClickable(): ClickDrawable<DrawElementStyle> {
    const element = new this._chosenElement({
      w: 50,
      h: 50,
      fill: "black",
      stroke: "black",
    });

    return element;
  }
  private createMoveable() {
    const element = new this._chosenElement({
      w: 2,
      fill: "red",
      stroke: "black",
    });

    if (!(element instanceof MoveDrawable)) {
      throw new Error("Element can not be drawn by Moving!");
    }

    return element;
  }
}
