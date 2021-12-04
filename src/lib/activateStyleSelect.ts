import Canvas from "../Canvas";

export default function activateStyleSelect(canvas: Canvas) {
  const inputs = getInputs();
  inputs.forEach((input) =>
    input.addEventListener("change", createHandleInputChange(canvas))
  );
}

export function getInputs(): NodeListOf<HTMLInputElement> {
  return document.querySelectorAll("[data-style]");
}

function createHandleInputChange(canvas: Canvas) {
  return (e: Event) => {
    const target = e.target as HTMLInputElement;
    const propToChange = target.dataset.style as "fill" | "stroke";

    if (propToChange in canvas.drawStyles) {
      canvas.drawStyles[propToChange] = target.value;
    } else {
      console.warn("Trying to access unregistered style: ", propToChange);
    }
  };
}
