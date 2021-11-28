import Canvas from "../Canvas";
import Circle from "../drawables/Circle";
import FreeStroke from "../drawables/FreeStroke";
import Rect from "../drawables/Rect";

const DRAWABLES = [FreeStroke, Rect, Circle];
const UTILITIES = ["clear", "revert", "restore"] as const;

type Utility = typeof UTILITIES[number];
type Drawable = typeof DRAWABLES[number];

export default function initDrawableButtons(canvas: Canvas) {
  const buttons = DRAWABLES.map((drawable) =>
    createDrawableButton(drawable, canvas)
  );
  UTILITIES.forEach((utility) => addUtility(canvas, utility));

  const buttonContainer = document.querySelector("[data-canvas='drawables']");

  if (!buttonContainer) {
    throw new Error(
      `Button Container not present. Please add a container element with '[data-canvas='drawables']' to the DOM`
    );
  }

  buttons.forEach((button) => buttonContainer.append(button));
}

function addUtility(canvas: Canvas, utility: Utility) {
  const button = document.querySelector(`[data-canvas="${utility}"]`);

  if (!button) {
    console.warn(
      `Did not find button for: ${utility}.\nThis utility will not be used.`
    );

    return;
  }
  button.addEventListener("click", () => {
    canvas[utility]();
  });
}

function createDrawableButton(drawable: Drawable, canvas: Canvas) {
  const button = document.createElement("button");
  button.classList.add("canvas-button");
  button.textContent = new drawable().label;

  button.addEventListener("click", () => {
    canvas.use(drawable);
  });
  return button;
}
