import { ClickDrawable } from "../abstracts/ClickDrawable";
import Canvas from "../lib/Canvas";

export interface RectData {
  w: number;
  h: number;
  fill: string;
  stroke: string;
}

export default class Rect extends ClickDrawable<RectData> {
  constructor(canvas: Canvas, data: RectData) {
    super(canvas, data);
  }

  setupStyle() {
    this.canvas.ctx.fillStyle = this.data.fill;
    this.canvas.ctx.strokeStyle = this.data.stroke;
  }

  draw(position: Coordinates): void {
    const { x, y, w, h } = { ...position, ...this.data };

    this.canvas.ctx.beginPath();
    this.setupStyle();

    this.canvas.ctx.rect(x - w / 2, y - h / 2, w, h);
    this.canvas.ctx.stroke();
    this.canvas.ctx.fill();
  }
}
