export const GRID_SIZE = 4;
export const TILE_SIZE_PX = 70;
export const TILE_SIZE_PX_BIG = 100;
export const GRID_GAP_PX = 16;
export const GRID_ARRAY = new Array(GRID_SIZE).fill(undefined).map((_, i) => i);
export const GRID_PLACEHOLDER = GRID_ARRAY.map(() =>
    GRID_ARRAY.map(() => undefined)
);
export const MOVE_LENGTH_MS = 200;

const Game = {
    GRID_SIZE,
    TILE_SIZE_PX,
    TILE_SIZE_PX_BIG,
    GRID_GAP_PX,
    GRID_PLACEHOLDER,
    MOVE_LENGTH_MS
};

export default Game;
