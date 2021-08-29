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
      this.setClickPosition(e);
      this.draw(ctx);
    };
  };

  setCanvas(canvas: HTMLCanvasElement): void {
    this._createHandler(canvas.getContext("2d")!);
    canvas.addEventListener("click", this.handler);
  }
  removeCanvas(canvas: HTMLCanvasElement): void {
    canvas.removeEventListener("click", this.handler);
  }
}
