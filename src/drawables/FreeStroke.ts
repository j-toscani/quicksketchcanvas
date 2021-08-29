import { MoveDrawable } from "../abstracts/MoveDrawable";

export interface CorneredLine {
  w: number;
  fill: string;
  stroke: string;
}

export default class FreeStroke extends MoveDrawable<CorneredLine> {
  key: string;
  constructor(data: CorneredLine) {
    super(data);
    this.key = "line";
  }

  setupStyle(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = this.data.w;
    ctx.strokeStyle = this.data.stroke ?? "black";
    ctx.lineJoin = "round";
  }

  start(ctx: CanvasRenderingContext2D): void {
    this.setupStyle(ctx);
    this.points = [{ ...this.position }];
    ctx.beginPath();
  }

  stop(ctx: CanvasRenderingContext2D): void {
    ctx.closePath();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineTo(this.position.x, this.position.y);
    ctx.stroke();
    ctx.moveTo(this.position.x, this.position.y);
    this.points.push({ ...this.position });
  }
}
