export type Direction = 'up' | 'right' | 'down' | 'left';

export type Coordinate = {
    row: number;
    col: number;
};

export type Tile = {
    id: string;
    coordinate: Coordinate;
    value: number;
};
