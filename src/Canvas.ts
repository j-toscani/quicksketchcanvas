import { getDistanceFromTo, getElementPosition } from "./lib/createGetClickCoordinatesOn.js";
import { Coordinates } from "./types.js";
import Rect from "./drawables/Rect.js";

type DrawOptions = {"rect": Rect}

function createDrawOptions(ctx: CanvasRenderingContext2D) {
  return {"rect": new Rect(ctx, {w: 100, h: 100, style: "black"})}
}

export default class Canvas {
  ctx: CanvasRenderingContext2D;
  element: HTMLCanvasElement;
  drawOptions: DrawOptions;
  active: keyof DrawOptions;
  mousePosition: Coordinates;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.drawOptions = createDrawOptions(ctx);
    this.active = "rect";
    this.element = canvas;
    this.mousePosition = {
        x:0,
        y:0
    }
  }

  get elementPosition (): Coordinates {
      return getElementPosition(this.element)
  }

  get clickPosition(): Coordinates {
      const {dx: x, dy: y} = getDistanceFromTo(this.elementPosition, this.mousePosition)
      return {x, y};
  }

  updatePosition(e: MouseEvent):void {
    this.mousePosition  = {
        x: e.clientX,
        y: e.clientY
    }
  }

  draw(): void {
    const drawable = this.drawOptions[this.active];
    drawable.draw(this.clickPosition);
  }
}
