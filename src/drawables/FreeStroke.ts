import { MoveDrawable } from "../abstracts/MoveDrawable";
import { Coordinates } from "../types";

export interface CorneredLine {
  w: number;
  stroke: string;
}

const config = {
  w: 2,
  stroke: "black",
};

export default class FreeStroke extends MoveDrawable<CorneredLine> {
  label: string;

  constructor(data?: CorneredLine, label: string = "Free Line") {
    super({ ...config, ...data });
    this.label = label;
  }

  setupStyle(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = this.data.w;
    ctx.strokeStyle = this.data.stroke;
    ctx.lineJoin = "round";
  }

  start(ctx: CanvasRenderingContext2D, e: MouseEvent): void {
    this.setupStyle(ctx);
    this.points = [this.getClickPosition(e)];
    ctx.beginPath();
  }

  stop(ctx: CanvasRenderingContext2D): void {
    ctx.closePath();
  }

  drawTo(ctx: CanvasRenderingContext2D, e: MouseEvent): void {
    const position = this.getClickPosition(e);
    this._draw(ctx, position);
    this.points.push(position);
  }
  private _addLine(ctx: CanvasRenderingContext2D, position: Coordinates) {
    const { x, y } = position;
    ctx.lineTo(x, y);
    ctx.moveTo(x, y);
  }

  private _draw(ctx: CanvasRenderingContext2D, position: Coordinates) {
    this._addLine(ctx, position);
    ctx.stroke();
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.setupStyle(ctx);
    ctx.beginPath();

    this.points.forEach((point) => this._addLine(ctx, point));
    ctx.stroke();
    ctx.closePath();
  }
}
