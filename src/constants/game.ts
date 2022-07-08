export const GRID_SIZE = 4;
export const TILE_SIZE_PX = 100;
export const GRID_GAP_PX = 16;
export const GRID_ARRAY = new Array(GRID_SIZE).fill(undefined).map((_, i) => i);
export const GRID_PLACEHOLDER = GRID_ARRAY.map(() =>
    GRID_ARRAY.map(() => undefined)
);
export const GRID_SIZE_PX =
    GRID_SIZE * TILE_SIZE_PX + GRID_SIZE * GRID_GAP_PX + GRID_GAP_PX;
export const MOVE_LENGTH_MS = 200;

const Game = {
    GRID_SIZE,
    TILE_SIZE_PX,
    GRID_GAP_PX,
    GRID_PLACEHOLDER,
    GRID_SIZE_PX,
    MOVE_LENGTH_MS
};

export default Game;
