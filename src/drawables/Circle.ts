import { ClickDrawable } from "../abstracts/ClickDrawable.js";


interface CircleData {
  r: number;
  stroke?: string;
  fill?: string
}

export default class Circle extends ClickDrawable<CircleData> {
  draw(position: Coordinates): void {
    const ctx  = this.canvas.ctx;
    const { x, y, r, fill, stroke } = { ...position, ...this.data };

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);

    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill()
    }

    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }
  }
}
