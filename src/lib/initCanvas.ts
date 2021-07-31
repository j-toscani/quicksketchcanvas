import createCanvas from "./createCanvas.js";
import Canvas from "./Canvas.js"
import initDrawableButtons from "./initDrawableButtons.js";

type CanvasInfos = {canvas: Canvas, active: string, available: string[]}

export default function initCanvas(query: string): CanvasInfos  {
    const canvas = createCanvas(query);
    const active = canvas.init();
    const available = initDrawableButtons(canvas);
    initRevertRestore(canvas);
    return {
        canvas: canvas,
        active,
        available
    }
}

function initRevertRestore(canvas: Canvas) {
    const revert = document.querySelector("#revert");
    const restore = document.querySelector("#restore");
    
    revert?.addEventListener("click", () => canvas.revert());
    restore?.addEventListener("click", () => canvas.restore());
}
