import { Coordinates } from "../types";
import StepHistory from "./StepHistory";

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

  setClickPosition(e: MouseEvent) {
    const targetRect = (e.target as HTMLElement).getBoundingClientRect();

    const position = {
      x: e.pageX - targetRect.x,
      y: e.pageY - targetRect.y,
    };
    this.position = position;
  }

  handler = (_e: MouseEvent) => {};

  abstract _createHandler = (
    _ctx: CanvasRenderingContext2D,
    history?: StepHistory<() => {}>
  ) => {};

  abstract setCanvas(
    element: HTMLCanvasElement,
    history?: StepHistory<() => {}>
  ): void;

  abstract removeCanvas(
    element: HTMLCanvasElement,
    history?: StepHistory<() => {}>
  ): void;
}
