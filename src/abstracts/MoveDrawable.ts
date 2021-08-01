import Canvas from "../lib/Canvas.js";
import { DrawElement } from "./DrawElement.js";

export abstract class MoveDrawable<T> extends DrawElement<T> implements Drawable {
    constructor(canvas: Canvas, data: T) {
        super(canvas, data);
    }
    handler = (e: MouseEvent): void => { 
       console.log(e);
    }
    select(): void {
        this.canvas.element.addEventListener("mousemove", this.handler)
    }
    deselect(): void {
        this.canvas.element.removeEventListener("mousemove", this.handler)
    }
}