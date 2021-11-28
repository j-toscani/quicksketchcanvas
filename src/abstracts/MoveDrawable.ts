import { Coordinates } from "../types";
import { DrawElement, DrawElementStyle } from "./DrawElement";

export abstract class MoveDrawable<
  T extends DrawElementStyle
> extends DrawElement<T> {
  points: Coordinates[];

  constructor(data: T) {
    super(data);
    this.points = [];
  }

  abstract setupStyle(ctx: CanvasRenderingContext2D): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;

  abstract start(ctx: CanvasRenderingContext2D, position: Coordinates): void;
  abstract stop(ctx: CanvasRenderingContext2D): void;
}
