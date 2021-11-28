import { ClickDrawable } from "../abstracts/ClickDrawable";

export interface CircleData {
  r: number;
  stroke: string;
  fill: string;
}

const config = {
  r: 50,
  fill: "black",
  stroke: "black",
};

export default class Circle extends ClickDrawable<CircleData> {
  label: string;
  constructor(data?: CircleData, label = "Circle") {
    super(data ? { ...config, ...data } : config);
    this.label = label
  }

  setupStyle(ctx: CanvasRenderingContext2D) {
    const { fill, stroke } = this.data;
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
