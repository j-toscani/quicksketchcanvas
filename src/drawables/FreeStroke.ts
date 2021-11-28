import { MoveDrawable } from "../abstracts/MoveDrawable";
import { Coordinates } from "../types";

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
    this._draw(ctx, position)
    this.points.push(position);
  }

  private _draw(ctx:CanvasRenderingContext2D, position: Coordinates) {
    const {x, y} = position;
    ctx.lineTo(x,y);
    ctx.stroke();
    ctx.moveTo(x,y);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.setupStyle(ctx);
    ctx.beginPath();

    this.points.forEach(point => this._draw(ctx, point));
    ctx.closePath();
  }
}
