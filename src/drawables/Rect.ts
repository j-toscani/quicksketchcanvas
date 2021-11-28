import { ClickDrawable } from "../abstracts/ClickDrawable";

export interface RectData {
  w: number;
  h: number;
  fill: string;
  stroke: string;
}

const config = {
  w: 5,
  h: 5,
  fill: "black",
  stroke: "black",
};

export default class Rect extends ClickDrawable<RectData> {
  label: string;
  constructor(data?: RectData, label: string = "Rectangle") {
    super(data ? { ...config, ...data } : config);
    this.label = label;
  }

  setupStyle(ctx: CanvasRenderingContext2D){
    ctx.fillStyle = this.data.fill;
    ctx.strokeStyle = this.data.stroke;
  }

  updateSizes(sizes: {w:number, h: number}){
    this.data = {...this.data, ...sizes};
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { x, y, w, h } = { ...this.position, ...this.data };
    this.setupStyle(ctx);
    ctx.fillRect(x, y , w, h);
  }
}
