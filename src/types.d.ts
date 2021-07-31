type Coordinates = {
    x: number,
    y: number
}

type Distance = {
    dx: number,
    dy: number
}

interface Useable {
    select: () => void;
    deselect: () => void;
}