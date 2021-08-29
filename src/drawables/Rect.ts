import { ClickDrawable } from "../abstracts/ClickDrawable";
import Canvas from "../lib/Canvas";

export interface RectData {
  w: number;
  h: number;
  fill: string;
  stroke: string;
}

export default class Rect extends ClickDrawable<RectData> {
  key: string;
  constructor(data: RectData) {
    super(data);
    this.key = "rect";
  }

  setupStyle(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.data.fill;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { x, y, w, h } = { ...this.position, ...this.data };
    this.setupStyle(ctx);
    ctx.fillRect(x - w / 2, y - h / 2, w, h);
  }
}
