import Canvas from "../lib/Canvas";
import { DrawElement, DrawElementStyle } from "./DrawElement";

export abstract class ClickDrawable<
  T extends DrawElementStyle
> extends DrawElement<T> {
  constructor(data: T) {
    super(data);
  }
  abstract setupStyle(ctx: CanvasRenderingContext2D): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;

  handleDraw(_e: MouseEvent) {}

  createHandler = (ctx: CanvasRenderingContext2D) => {
    this.handleDraw = (e: MouseEvent): void => {
      this.getClickPosition(e);
      this.draw(ctx);
    };
  };

  select(canvas: HTMLCanvasElement): void {
    canvas.addEventListener("click", this.handleDraw);
  }
  deselect(canvas: HTMLCanvasElement): void {
    canvas.removeEventListener("click", this.handleDraw);
  }
}
