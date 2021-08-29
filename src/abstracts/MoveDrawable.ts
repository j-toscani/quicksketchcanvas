import { Coordinates } from "../types";
import { DrawElement, DrawElementStyle } from "./DrawElement";

export abstract class MoveDrawable<
  T extends DrawElementStyle
> extends DrawElement<T> {
  points: Coordinates[];
  active: boolean;

  constructor(data: T) {
    super(data);
    this.active = false;
    this.points = [];
  }

  abstract setupStyle(ctx: CanvasRenderingContext2D): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;

  abstract start(ctx: CanvasRenderingContext2D): void;
  abstract stop(ctx: CanvasRenderingContext2D): void;

  handleMove(ctx: CanvasRenderingContext2D, e: MouseEvent) {
    if (!this.active) {
      return;
    }
    this.getClickPosition(e);
    this.draw(ctx);
  }

  handleMouseUpOrLeave(ctx: CanvasRenderingContext2D) {
    this.active = false;
    this.stop(ctx);
  }

  handleMouseDown(ctx: CanvasRenderingContext2D) {
    this.active = true;
    this.start(ctx);
  }

  _createHandler = (ctx: CanvasRenderingContext2D) => {
    this.handler = (e: MouseEvent): void => {
      const { type } = e;

      switch (type) {
        case "mousemove":
          this.handleMove(ctx, e);
          break;
        case "mouseup":
        case "mouseleave":
          this.handleMouseUpOrLeave(ctx);
          break;
        case "mousedown":
          this.handleMouseDown(ctx);
          break;
        default:
          console.warn("Unhandled mouse Event:", type);
          break;
      }
    };
  };

  select(element: HTMLCanvasElement) {
    this._createHandler(element.getContext("2d")!);

    element.addEventListener("mousemove", this.handler);
    element.addEventListener("mousedown", this.handler);
    element.addEventListener("mouseup", this.handler);
    element.addEventListener("mouseleave", this.handler);
  }

  deselect(element: HTMLCanvasElement) {
    element.removeEventListener("mousemove", this.handler);
    element.removeEventListener("mousedown", this.handler);
    element.removeEventListener("mouseup", this.handler);
    element.removeEventListener("mouseleave", this.handler);
  }
}
