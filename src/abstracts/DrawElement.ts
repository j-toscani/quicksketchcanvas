import Canvas from "../lib/Canvas";

export abstract class DrawElement<T> {
  data: T;
  canvas: Canvas;

  constructor(canvas: Canvas, data: T) {
    this.canvas = canvas;
    this.data = data;
  }

  abstract draw(position: Coordinates): void;
}
