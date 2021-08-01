import { MoveDrawable } from "../abstracts/MoveDrawable.js";

export interface CorneredLine {
  w: number;
  fill: string;
}

export default class FreeStroke extends MoveDrawable<CorneredLine> {
  draw(position: Coordinates): void {
    const { x, y, w, fill } = { ...position, ...this.data };
    this.canvas.ctx.fillStyle = fill;
    this.canvas.ctx.fillRect(x - w / 2, y - w / 2, w, w);
  }
}
