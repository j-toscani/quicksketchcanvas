import { MoveDrawable } from "../abstracts/MoveDrawable";
import Canvas from "../lib/Canvas";

export interface CorneredLine {
  w: number;
  fill?: string;
  stroke?: string;
}

export default class FreeStroke extends MoveDrawable<CorneredLine> {
  constructor(canvas: Canvas, data: CorneredLine) {
    super(canvas, data);
  }

  setupStyle() {
    this.canvas.ctx.lineWidth = this.data.w;
    this.canvas.ctx.strokeStyle = this.data.stroke ?? "black";
    this.canvas.ctx.lineJoin = "round";
  }

  start(_e: MouseEvent): void {
    this.canvas.ctx.beginPath();
  }

  stop(_e: MouseEvent): void {
    this.canvas.ctx.closePath();
  }

  draw(position: Coordinates): void {
    this.canvas.ctx.lineTo(position.x, position.y);
    this.canvas.ctx.stroke();
    this.canvas.ctx.moveTo(position.x, position.y);
  }
}
