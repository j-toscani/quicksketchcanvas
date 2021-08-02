import Canvas from "../lib/Canvas.js";
import { DrawElement } from "./DrawElement.js";

export abstract class MoveDrawable<T> extends DrawElement<T> implements Drawable {
    from: Coordinates | null

    constructor(canvas: Canvas, data: T) {
        super(canvas, data);
        this.from = null;
    }

    handler = (e: MouseEvent): void => { 
        this.canvas.updatePosition(e);
        const position = {...this.canvas.clickPosition};

        this.draw(position);
    }

    abstract start(e:MouseEvent):void
    abstract stop(e:MouseEvent):void

    activate = (e : MouseEvent):void => {
        const canvas = this.canvas.element;
        
        this.start(e);
        
        canvas.addEventListener("mousemove", this.handler);
        canvas.addEventListener("mouseup", this.deactivate)
        canvas.addEventListener("mouseleave", this.deactivate)
    }
    deactivate = (e: MouseEvent):void => {
        const canvas = this.canvas.element;
        this.stop(e)
        canvas.removeEventListener("mousemove", this.handler);
        canvas.removeEventListener("mouseup", this.deactivate);
        canvas.removeEventListener("mouseleave", this.deactivate);        
    }
    select(): void {
        this.canvas.element.addEventListener("mousedown", this.activate)
    }
    deselect(): void {
        this.canvas.element.removeEventListener("mousedown", this.activate)
    }
}