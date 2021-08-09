import { StylePropertyKey } from "../abstracts/DrawElement";
import Canvas from "./Canvas";

export default function activateStyleSelect(canvas: Canvas) {
  const inputs = getInputs();
  inputs.forEach((input) =>
    input.addEventListener("change", createHandleInputChange(canvas))
  );
}

function getInputs() {
  return document.querySelectorAll("[data-style]");
}

function createHandleInputChange(canvas: Canvas) {
  return (e: Event) => {
    const target = e.target as HTMLInputElement;
    const propToChange = getStyleDataProp(target);

    if (!propToChange) {
      throw Error("Unacceptable style prop on input.");
    }

    const drawElement = canvas.drawOptions[canvas.active];
    drawElement.data[propToChange] = target.value;
  };
}

function getStyleDataProp(element: HTMLInputElement): StylePropertyKey | false {
  const propToChange = element.dataset.style as "fill" | "stroke";
  return propToChange && ["fill", "stroke"].includes(propToChange)
    ? propToChange
    : false;
}
