import { Coordinates } from "../types";

export interface DrawElementStyle {
  fill?: string;
  stroke: string;
}

export type StylePropertyKey = keyof DrawElementStyle;

export abstract class DrawElement<T> {
  data: T;
  position: Coordinates;

  constructor(data: T) {
    this.data = data;
    this.position = { x: 0, y: 0 };
  }

  getClickPosition(e: MouseEvent) {
    return {
      x: e.offsetX,
      y: e.offsetY,
    };
  }
}
