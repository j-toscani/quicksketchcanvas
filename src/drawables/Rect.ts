import { ClickDrawable } from "../abstracts/ClickDrawable.js";
import Canvas from "../lib/Canvas.js";

export interface RectData {
  w: number;
  h: number;
  fill: string;
}

export default class Rect extends ClickDrawable<RectData> {
  constructor(canvas: Canvas, data: RectData) {
    super(canvas, data);
  }

  setupStyle() {
    this.canvas.ctx.fillStyle = this.data.fill;
  }
  draw(position: Coordinates): void {
    this.setupStyle();
    const { x, y, w, h } = { ...position, ...this.data };
    this.canvas.ctx.fillRect(x - w / 2, y - h / 2, w, h);
  }
}
