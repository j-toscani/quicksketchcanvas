import { Coordinates, Distance } from "../types";

export default function createGetClickCoordinates(element: HTMLElement): (e:MouseEvent) => Coordinates {
    const canvasPosition = getElementPosition(element);
    return (e: MouseEvent) => {
        const mousePosition = getMousePosition(e);
        const {dx, dy} =  getDistanceFromTo(canvasPosition, mousePosition);
        
        return {
            x : dx,
            y: dy
        }
    }
}



export function getElementPosition(element: HTMLElement): Coordinates {
    const elementRect = element.getBoundingClientRect();
    return {
        x: elementRect.x,
        y: elementRect.y,
    }
}

export function getMousePosition(event: MouseEvent): Coordinates {
    return {
        x: event.clientX,
        y: event.clientY
    } 
}

export function getDistanceFromTo(from: Coordinates, to: Coordinates): Distance {
    const {x : xFrom, y: yFrom} = from;
    const {x: xTo, y: yTo} = to;

    return {
        dx: xTo - xFrom,
        dy: yTo - yFrom
    }
}