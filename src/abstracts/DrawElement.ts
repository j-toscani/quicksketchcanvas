import Canvas from "../lib/Canvas";

export interface DrawElementStyle {
  fill: string;
  stroke: string;
}

export type StylePropertyKey = keyof DrawElementStyle;

export abstract class DrawElement<T> {
  data: T;
  canvas: Canvas;

  constructor(canvas: Canvas, data: T) {
    this.canvas = canvas;
    this.data = data;
  }

  abstract draw(position: Coordinates): void;
}
