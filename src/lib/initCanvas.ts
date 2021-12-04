import createCanvas from "./createCanvas";
import Canvas from "../Canvas";
import initDrawableButtons from "./initDrawableButtons";
import activateStyleSelect from "./activateStyleSelect";

export default function initCanvas(query: string): Canvas {
  const canvas = createCanvas(query);
  initDrawableButtons(canvas);
  activateStyleSelect(canvas);

  return canvas;
}
