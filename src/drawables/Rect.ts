import { ClickDrawable } from "../abstracts/ClickDrawable.js";

export interface RectData {
  w: number;
  h: number;
  fill: string;
}

export default class Rect extends ClickDrawable<RectData> {
  draw(position: Coordinates): void {
    const { x, y, w, h, fill } = { ...position, ...this.data };
    this.canvas.ctx.fillStyle = fill;
    this.canvas.ctx.fillRect(x - w / 2, y - h / 2, w, h);
  }
}
