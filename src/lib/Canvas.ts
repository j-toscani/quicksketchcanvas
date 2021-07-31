import { getDistanceFromTo, getElementPosition } from "./createGetClickCoordinatesOn.js";
import Rect from "../drawables/Rect.js";
import Circle from "../drawables/Circle.js";

export type DrawOptions = {rect: Rect, circle: Circle}

function createDrawOptions(canvas: Canvas) {
  return {
    "rect": new Rect(canvas, {w: 100, h: 100, style: "black"}),
    "circle": new Circle(canvas, {r: 50, stroke: "black", fill: "white"})
  }
}

export default class Canvas {
  ctx: CanvasRenderingContext2D;
  element: HTMLCanvasElement;
  drawOptions: DrawOptions;
  _active: keyof DrawOptions;
  mousePosition: Coordinates;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.drawOptions = createDrawOptions(this);
    this._active = "circle";
    this.element = canvas;
    this.mousePosition = {
        x:0,
        y:0
    }
  }

  get elementPosition (): Coordinates {
      return getElementPosition(this.element)
  }

  get clickPosition(): Coordinates {
      const {dx: x, dy: y} = getDistanceFromTo(this.elementPosition, this.mousePosition)
      return {x, y};
  }

  get active(): keyof DrawOptions {
    return this._active;
  }

  set active(value: keyof DrawOptions) {
    this.drawOptions[this._active].deselect();

    if (Object.prototype.hasOwnProperty.call(this.drawOptions, value)) {
      this.drawOptions[value].select();
      this._active = value
    }
  }

  updatePosition(e: MouseEvent):void {
    this.mousePosition  = {
        x: e.clientX,
        y: e.clientY
    }
  }

  draw(): void {
    console.log(this.active)
    const drawable = this.drawOptions[this.active];
    drawable.draw(this.clickPosition);
  }

  init():string {
    this.drawOptions[this.active].select();
    return this._active
  }
}
