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
  draw(position: Coordinates): void {
    const ctx = this.canvas.ctx;
    const { x, y, r, fill = "black", stroke = "black" } = { ...position, ...this.data };

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);

    ctx.fillStyle = fill;
    ctx.fill();
    
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}
