import createCanvas from "./lib/createCanvas.js";

const canvas = createCanvas("canvas");

canvas.element.addEventListener("click", (e) => {
    canvas.updatePosition(e);
    canvas.draw();
});
