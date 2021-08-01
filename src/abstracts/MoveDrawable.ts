import Canvas from "../lib/Canvas.js";
import { DrawElement } from "./DrawElement.js";

export abstract class MoveDrawable<T> extends DrawElement<T> implements Drawable {
    constructor(canvas: Canvas, data: T) {
        super(canvas, data);
    }

    handler = (e: MouseEvent): void => { 
        this.canvas.updatePosition(e);
        const position = {...this.canvas.clickPosition};

        this.draw(position);
    }
    activate():void {
        const canvas = this.canvas.element;
        canvas.addEventListener("mousemove", this.handler);

        const deactivate = () => {
            canvas.removeEventListener("mousemove", this.handler);
            canvas.removeEventListener("mouseup", deactivate);
            canvas.removeEventListener("mouseleave", deactivate);
        }

        canvas.addEventListener("mouseup", deactivate)
        canvas.addEventListener("mouseleave", deactivate)
    }
    select(): void {
        this.canvas.element.addEventListener("mousedown", this.activate)
    }
    deselect(): void {
        this.canvas.element.removeEventListener("mousedown", this.activate)
    }
}