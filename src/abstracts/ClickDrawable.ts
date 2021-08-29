import { DrawElement, DrawElementStyle } from "./DrawElement";

export abstract class ClickDrawable<
  T extends DrawElementStyle
> extends DrawElement<T> {
  constructor(data: T) {
    super(data);
  }

  abstract setupStyle(ctx: CanvasRenderingContext2D): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;

  _createHandler = (ctx: CanvasRenderingContext2D) => {
    this.handler = (e: MouseEvent): void => {
      this.getClickPosition(e);
      this.draw(ctx);
    };
  };

  select(canvas: HTMLCanvasElement): void {
    this._createHandler(canvas.getContext("2d")!);
    canvas.addEventListener("click", this.handler);
  }
  deselect(canvas: HTMLCanvasElement): void {
    canvas.removeEventListener("click", this.handler);
  }
}
