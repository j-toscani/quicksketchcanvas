import { getDistanceFromTo, getElementPosition } from "./createGetClickCoordinatesOn.js";

export default class Canvas {
  ctx: CanvasRenderingContext2D;
  element: HTMLCanvasElement;
  mousePosition: Coordinates;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
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

  drawRect(
    size: { w: number; h: number },
    color = "black"
  ): void {
    const { x, y, w, h } = { ...this.clickPosition, ...size };
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - w / 2, y - h / 2, w, h);
  }
}
