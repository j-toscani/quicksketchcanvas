import Canvas from "../lib/Canvas.js";

export abstract class DrawElement<T> {
    data: T;
    canvas: Canvas;

    constructor(canvas: Canvas, data: T) {
        this.canvas = canvas;
        this.data = data;
    }

    draw(position: Coordinates):void {
        console.log("draw", position);
    }
}
