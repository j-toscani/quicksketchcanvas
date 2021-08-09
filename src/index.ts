import activateStyleSelect from "./lib/activateStyleSelect";
import initCanvas from "./lib/initCanvas";
import "./style.css";

const { canvas } = initCanvas("canvas");
activateStyleSelect(canvas);
