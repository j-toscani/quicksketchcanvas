import { ClickDrawable } from "../abstracts/ClickDrawable";

export interface CircleData {
  r: number;
  stroke: string;
  fill: string;
}

export default class Circle extends ClickDrawable<CircleData> {
  key: string;
  constructor(data: CircleData) {
    super(data);
    this.key = "circle";
  }

  setupStyle(ctx: CanvasRenderingContext2D) {
    const { fill = "white", stroke = "black" } = this.data;
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    this.setupStyle(ctx);

    ctx.beginPath();
    ctx.arc(x, y, this.data.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}
