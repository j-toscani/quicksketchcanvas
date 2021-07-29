import { getDistanceFromTo, getElementPosition } from "./createGetClickCoordinatesOn.js";

class Canvas {
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

  get elementPosition () {
      return getElementPosition(this.element)
  }

  get clickPosition() {
      const {dx: x, dy: y} = getDistanceFromTo(this.elementPosition, this.mousePosition)
      return {x, y};
  }

  updatePosition(e: MouseEvent) {
    this.mousePosition  = {
        x: e.clientX,
        y: e.clientY
    }
  }

  drawRect(
    size: { w: number; h: number },
    color = "black"
  ) {
    const { x, y, w, h } = { ...this.clickPosition, ...size };
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - w / 2, y - h / 2, w, h);
  }
}

export default function getCanvas(query: string): Canvas {
  const canvasEl = document.querySelector(query) as HTMLCanvasElement;

  if (!canvasEl) {
    throw new Error("No Canvas available.");
  }

  const ctx = canvasEl.getContext("2d");

  if (!ctx) {
    throw new Error("No context was created");
  }

  return new Canvas(canvasEl, ctx);
}
