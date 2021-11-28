import { Coordinates } from "../types";
import { DrawElement, DrawElementStyle } from "./DrawElement";

export abstract class ClickDrawable<
  T extends DrawElementStyle
> extends DrawElement<T> {
  constructor(data: T) {
    super(data);
  }

  abstract setupStyle(ctx: CanvasRenderingContext2D): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
