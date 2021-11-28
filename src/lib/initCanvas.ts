import createCanvas from "./createCanvas";
import Canvas from "../Canvas";
import initDrawableButtons from "./initDrawableButtons";

export default function initCanvas(query: string): Canvas {
  const canvas = createCanvas(query);
  initDrawableButtons(canvas);

  return canvas;
}
