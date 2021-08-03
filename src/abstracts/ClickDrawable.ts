import Canvas from "../lib/Canvas.js";
import { DrawElement } from "./DrawElement.js";

export abstract class ClickDrawable<T> extends DrawElement<T> implements Drawable {
    constructor(canvas: Canvas, data: T) {
        super(canvas, data);
    }
    abstract setupStyle():void
    handler = (e: MouseEvent): void => { 
        this.canvas.updatePosition(e);
        const position = {...this.canvas.clickPosition};
        const drawFunction = () => this.draw(position);
        this.canvas.addToHistory(drawFunction);
        drawFunction();
    }
    select(): void {
        this.canvas.element.addEventListener("click", this.handler)
    }
    deselect(): void {
        this.canvas.element.removeEventListener("click", this.handler)
    }
}