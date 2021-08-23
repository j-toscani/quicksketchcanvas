import Canvas from "../lib/Canvas";
import { DrawElement, DrawElementStyle } from "./DrawElement";

export abstract class MoveDrawable<
  T extends DrawElementStyle
> extends DrawElement<T> {
  points: Coordinates[];

  constructor(data: T) {
    super(data);
    this.points = [];
  }

  abstract start(e: MouseEvent): void;
  abstract stop(e: MouseEvent): void;

  createHandler = (ctx: CanvasRenderingContext2D) => {
    (e: MouseEvent): void => {
      this.getClickPosition(e);

      this.draw(ctx);
      this.trackJourney();
    };
  };

  trackJourney(): void {
    this.points.push({ ...this.position });
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
