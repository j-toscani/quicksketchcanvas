import { DrawElement } from "./DrawElement.js";

export abstract class ClickDrawable<T> extends DrawElement<T> implements Useable {
    onClick = (e: MouseEvent): void => { 
        this.canvas.updatePosition(e);
        this.draw(this.canvas.clickPosition)
     }
    select(): void {
        this.canvas.element.addEventListener("click", this.onClick)
    }
    deselect(): void {
        this.canvas.element.removeEventListener("click", this.onClick)
    }
}