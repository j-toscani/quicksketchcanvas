import { Coordinates, Drawable, DrawElement } from "../types";

interface RectData {
  w: number;
  h: number;
  style: string;
}

export default class Rect extends DrawElement<RectData> implements Drawable {
  draw(position: Coordinates): void {
    const { x, y, w, h, style } = { ...position, ...this.data };
    this.ctx.fillStyle = style;
    this.ctx.fillRect(x - w / 2, y - h / 2, w, h);
  }
  select(): void {
      console.log("selected")
  }
  deselect(): void {
    console.log("deselected")
  }
}
