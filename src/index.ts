import getCanvas from "./getCanvas.js";

const canvas = getCanvas("canvas");

canvas.element.addEventListener("click", (e) => {
    canvas.updatePosition(e);
    canvas.drawRect({w: 100, h: 100});
});
