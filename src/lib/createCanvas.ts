import Canvas from "../Canvas";

export default function createCanvas(query: string): Canvas {
  const canvasEl = document.querySelector(query) as HTMLCanvasElement;

  if (!canvasEl) {
    throw new Error("No Canvas available.");
  }

  const ctx = canvasEl.getContext("2d");

  if (!ctx) {
    throw new Error("No context was created");
  }

  return new Canvas(canvasEl);
}
