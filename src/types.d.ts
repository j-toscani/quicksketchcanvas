import Circle from "./drawables/Circle";
import FreeStroke from "./drawables/FreeStroke";
import Rect from "./drawables/Rect";

type Coordinates = {
  x: number;
  y: number;
};

type Distance = {
  dx: number;
  dy: number;
};

export type Drawable = Rect | Circle | FreeStroke;
