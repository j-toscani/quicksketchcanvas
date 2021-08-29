import { Coordinates } from "../types";

export interface DrawElementStyle {
  fill: string;
  stroke: string;
}

export type StylePropertyKey = keyof DrawElementStyle;

export abstract class DrawElement<T> {
  data: T;
  position: Coordinates;
  abstract key: string;

  constructor(data: T) {
    this.data = data;
    this.position = { x: 0, y: 0 };
  }

  getClickPosition(e: MouseEvent) {
    const targetRect = (e.target as HTMLElement).getBoundingClientRect();

    this.position = {
      x: e.pageX - targetRect.x,
      y: e.pageY - targetRect.y,
    };
  }

  handler = (_e: MouseEvent) => {};

  abstract _createHandler = (ctx: CanvasRenderingContext2D) => {};

  abstract select(element: HTMLCanvasElement): void;
  abstract deselect(element: HTMLCanvasElement): void;
}
