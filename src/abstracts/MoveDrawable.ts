import Canvas from "../lib/Canvas";
import { DrawElement } from "./DrawElement";

export abstract class MoveDrawable<T>
  extends DrawElement<T>
  implements Drawable
{
  points: Coordinates[];

  constructor(canvas: Canvas, data: T) {
    super(canvas, data);
    this.points = [];
  }

  abstract start(e: MouseEvent): void;
  abstract stop(e: MouseEvent): void;
  abstract setupStyle(): void;

  handler = (e: MouseEvent): void => {
    this.canvas.updatePosition(e);
    const position = { ...this.canvas.clickPosition };

    this.draw(position);
    this.trackJourney(position);
  };

  trackJourney(coordinates: Coordinates): void {
    this.points.push({ ...coordinates });
  }

  activate = (e: MouseEvent): void => {
    this.canvas.updatePosition(e);
    this.points = [{ ...this.canvas.clickPosition }];

    this.addHandler(this.canvas.element);
    this.start(e);
  };

  addHandler(canvas: HTMLCanvasElement) {
    canvas.addEventListener("mousemove", this.handler);
    canvas.addEventListener("mouseup", this.deactivate);
    canvas.addEventListener("mouseleave", this.deactivate);
  }

  deactivate = (e: MouseEvent): void => {
    this.removeHandler(this.canvas.element);
    this.stop(e);
    const points = this.points.map((point) => ({ ...point }));
    const drawMovement = () => {
      this.canvas.ctx.beginPath();
      points.forEach((point) => this.draw(point));
      this.canvas.ctx.closePath();
    };

    this.canvas.addToHistory(drawMovement);
  };

  removeHandler(canvas: HTMLCanvasElement) {
    canvas.removeEventListener("mousemove", this.handler);
    canvas.removeEventListener("mouseup", this.deactivate);
    canvas.removeEventListener("mouseleave", this.deactivate);
  }

  select(): void {
    this.canvas.element.addEventListener("mousedown", this.activate);
  }
  deselect(): void {
    this.canvas.element.removeEventListener("mousedown", this.activate);
  }
}
