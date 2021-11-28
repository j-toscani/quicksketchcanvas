import { ClickDrawable } from "../abstracts/ClickDrawable";

export interface CircleData {
  w: number;
  h: number;
  stroke: string;
  fill: string;
}

const config = {
  w: 5,
  h: 5,
  fill: "black",
  stroke: "black",
};

export default class Circle extends ClickDrawable<CircleData> {
  label: string;
  constructor(data?: CircleData, label = "Circle") {
    super(data ? { ...config, ...data } : config);
    this.label = label;
  }

  setupStyle(ctx: CanvasRenderingContext2D){
    const { fill, stroke } = this.data;
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
  }

  updateSizes(sizes: { w: number; h: number }){
    sizes = {w: Math.abs(sizes.w), h: Math.abs(sizes.h)}
    this.data = {...this.data, ...sizes}
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { x, y, w, h } = { ...this.position, ...this.data };
    this.setupStyle(ctx);

    ctx.beginPath();
    ctx.arc(x, y, Math.max(w, h), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}
