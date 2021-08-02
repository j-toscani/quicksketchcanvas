import { MoveDrawable } from "../abstracts/MoveDrawable.js";
import Canvas from "../lib/Canvas.js";

export interface CorneredLine {
  w: number;
  fill: string;
}

export default class FreeStroke extends MoveDrawable<CorneredLine> {
  constructor(canvas: Canvas, data: CorneredLine) {
    super(canvas, data)
  }

  start(e:MouseEvent):void {    
    this.canvas.updatePosition(e);
    this.from = {...this.canvas.clickPosition};
  }

  stop(e:MouseEvent):void {
    e
  }

  draw(position: Coordinates): void {
    const { x, y, w, fill } = { ...position, ...this.data };
    this.canvas.ctx.fillStyle = fill;
    this.canvas.ctx.fillRect(x - w / 2, y - w / 2, w, w);
  }
}
