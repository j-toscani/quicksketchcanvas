import { ClickDrawable } from "../abstracts/ClickDrawable.js";
import Canvas from "../lib/Canvas.js";

export interface CircleData {
  r: number;
  stroke?: string;
  fill?: string;
}

export default class Circle extends ClickDrawable<CircleData> {
  constructor(canvas: Canvas, data: CircleData) {
    super(canvas, data);
  }
  setupStyle() {
    const { fill = "white", stroke = "black" } = this.data;
    this.canvas.ctx.fillStyle = fill;
    this.canvas.ctx.strokeStyle = stroke;
  }

  draw(position: Coordinates): void {
    const ctx = this.canvas.ctx;
    this.setupStyle();
    const { x, y } = position;

    ctx.beginPath();
    ctx.arc(x, y, this.data.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}
