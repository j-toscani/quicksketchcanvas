import { ClickDrawable } from "../abstracts/ClickDrawable.js";

export interface RectData {
  w: number;
  h: number;
  style: string;
}

export default class Rect extends ClickDrawable<RectData> {
  draw(position: Coordinates): void {
    const { x, y, w, h, style } = { ...position, ...this.data };
    this.canvas.ctx.fillStyle = style;
    this.canvas.ctx.fillRect(x - w / 2, y - h / 2, w, h);
  }
}
