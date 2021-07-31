type Coordinates = {
    x: number,
    y: numner
}

type Distance = {
    dx: number,
    dy: number
}

export abstract class DrawElement<T> {
    data: T;
    ctx: RenderingContext2D;

    constructor(ctx: RenderingContext, data: T) {
        this.ctx = ctx;
        this.data = data;
    }
}

interface Drawable {
    draw: (position: Coordinates) => void;
    select: () => void;
    deselect: () => void;
}