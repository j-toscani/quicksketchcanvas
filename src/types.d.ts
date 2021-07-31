type Coordinates = {
    x: number,
    y: number
}

type Distance = {
    dx: number,
    dy: number
}

interface Drawable {
    handler: (e: MouseEvent) => void
    select: () => void;
    deselect: () => void;
}