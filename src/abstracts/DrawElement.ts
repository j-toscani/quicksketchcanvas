import Canvas from "../lib/Canvas";

type DrawElementStyle = {
  fill: string;
  stroke: string;
};

export abstract class DrawElement<T> {
  data: T & DrawElementStyle;
  canvas: Canvas;

  constructor(canvas: Canvas, data: T) {
    this.canvas = canvas;
    this.data = { ...data, fill: "#000", stroke: "#000" };
  }

  abstract draw(position: Coordinates): void;
}
