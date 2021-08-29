import createCanvas from "./createCanvas";
import Canvas from "../Canvas";
import initDrawableButtons from "./initDrawableButtons";
import { DrawElement } from "../abstracts/DrawElement";
import { Drawable } from "../types";

type CanvasInfos = {
  canvas: Canvas;
  active: Drawable;
  available: string[];
};

export default function initCanvas(query: string): CanvasInfos {
  const canvas = createCanvas(query);
  canvas.init();
  const available = initDrawableButtons(canvas);

  initRevertRestore(canvas);

  return {
    canvas: canvas,
    active: canvas.active,
    available,
  };
}

function initRevertRestore(canvas: Canvas) {
  const revert = document.querySelector("#revert");
  const restore = document.querySelector("#restore");

  revert?.addEventListener("click", () => canvas.revert());
  restore?.addEventListener("click", () => canvas.restore());
}
