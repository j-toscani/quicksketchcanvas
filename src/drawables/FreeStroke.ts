import { MoveDrawable } from "../abstracts/MoveDrawable.js";

export interface CorneredLine {
  w: number;
  style: string;
}

export default class Rect extends MoveDrawable<CorneredLine> {
  draw(position: Coordinates): void {
    const { x, y, w, style } = { ...position, ...this.data };
    this.canvas.ctx.fillStyle = style;
    this.canvas.ctx.fillRect(x - w / 2, y - w / 2, w, w);
  }
}
