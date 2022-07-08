import { uniqueId, cloneDeep } from 'lodash';
import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { randomCoordinate, randomIndex, flipCoin } from 'utils';
import Game from 'constants/game';
import { Coordinate, Direction, Tile } from 'types';

type Tiles = Record<string, Tile[]>;
type SlideOptionsType = Record<
    Direction,
    {
        rowInitial: number;
        rowCondition: (row: number) => boolean;
        rowStep: (row: number) => number;
        colInitial: number;
        colCondition: (col: number) => boolean;
        colStep: (col: number) => number;
        slideCondition: (coordinate: Coordinate) => boolean;
        slideStep: (coordinate: Coordinate) => Coordinate;
    }
>;

interface GameState {
    tiles: Tiles;
    score: number;
    slides: number;
    combinableTiles: string[];
    history: {
        tiles: Tiles;
        score: number;
    }[];
}

const getTwoCoordinates = () => {
    const coords = randomCoordinate();
    let nextCoords = { row: coords.row, col: coords.col };

    while (coords.row === nextCoords.row && coords.col === nextCoords.col) {
        nextCoords = randomCoordinate();
    }

    return [coords, nextCoords];
};

const spawnTile = (
    coordinate: Coordinate,
    value: number = flipCoin() ? 2 : 4
): Tile => {
    return {
        id: uniqueId(),
        coordinate,
        value
    };
};

const spawnRandomAvailableTile = (tiles: Tiles) => {
    const availableSpaces = (() => {
        const coords: Coordinate[] = [];
        Game.GRID_PLACEHOLDER.forEach((_, row) =>
            _.forEach((_, col) => {
                const tile = getTileAtCoordinate(tiles, { row, col });
                if (!tile) {
                    coords.push({ row, col });
                }
            })
        );

        return coords;
    })();

    const newCoord = randomIndex(availableSpaces);
    const newTile = spawnTile(newCoord);

    return newTile;
};

const getTileKey = (coordinate: Coordinate) =>
    `${coordinate.row}-${coordinate.col}`;

const getTileAtCoordinate = (tiles: Tiles, coordinate: Coordinate) => {
    const tile = tiles[getTileKey(coordinate)];
    return tile ? tile[0] : null;
};

const initializeTiles = (): Tiles => {
    const [c1, c2] = getTwoCoordinates();

    const t1 = spawnTile(c1, 2);
    const t2 = spawnTile(c2, 2);

    return {
        [getTileKey(t1.coordinate)]: [t1],
        [getTileKey(t2.coordinate)]: [t2]
    };
};

const SlideOptions: SlideOptionsType = {
    right: {
        rowInitial: 0,
        rowCondition: (row) => row < Game.GRID_SIZE,
        rowStep: (row) => row + 1,
        colInitial: Game.GRID_SIZE - 1,
        colCondition: (col) => col >= 0,
        colStep: (col) => col - 1,
        slideCondition: (coordinate) => coordinate.col < Game.GRID_SIZE - 1,
        slideStep: (coordinate) => ({
            row: coordinate.row,
            col: coordinate.col + 1
        })
    },
    down: {
        rowInitial: Game.GRID_SIZE - 1,
        rowCondition: (row) => row >= 0,
        rowStep: (row) => row - 1,
        colInitial: 0,
        colCondition: (col) => col < Game.GRID_SIZE,
        colStep: (col) => col + 1,
        slideCondition: (coordinate) => coordinate.row < Game.GRID_SIZE - 1,
        slideStep: (coordinate) => ({
            row: coordinate.row + 1,
            col: coordinate.col
        })
    },
    left: {
        rowInitial: 0,
        rowCondition: (row) => row < Game.GRID_SIZE,
        rowStep: (row) => row + 1,
        colInitial: 0,
        colCondition: (col) => col < Game.GRID_SIZE,
        colStep: (col) => col + 1,
        slideCondition: (coordinate) => coordinate.col > 0,
        slideStep: (coordinate) => ({
            row: coordinate.row,
            col: coordinate.col - 1
        })
    },
    up: {
        rowInitial: Game.GRID_SIZE - 1,
        rowCondition: (row) => row >= 0,
        rowStep: (row) => row - 1,
        colInitial: 0,
        colCondition: (col) => col < Game.GRID_SIZE,
        colStep: (col) => col + 1,
        slideCondition: (coordinate) => coordinate.row > 0,
        slideStep: (coordinate) => ({
            row: coordinate.row - 1,
            col: coordinate.col
        })
    }
};

/**
 * Slides the tiles in place
 */
const slideTiles = (state: GameState, direction: Direction) => {
    state.slides = 0;

    const {
        rowInitial,
        rowCondition,
        rowStep,
        colInitial,
        colCondition,
        colStep,
        slideCondition,
        slideStep
    } = SlideOptions[direction];

    for (let row = rowInitial; rowCondition(row); row = rowStep(row)) {
        for (let col = colInitial; colCondition(col); col = colStep(col)) {
            const tile = getTileAtCoordinate(state.tiles, { row, col });

            if (tile) {
                while (slideCondition(tile.coordinate)) {
                    const adjacentTile = getTileAtCoordinate(
                        state.tiles,
                        slideStep(tile.coordinate)
                    );

                    if (adjacentTile) {
                        if (
                            adjacentTile.value !== tile.value ||
                            state.combinableTiles.includes(
                                getTileKey(adjacentTile.coordinate)
                            )
                        ) {
                            break;
                        } else {
                            tile.coordinate = slideStep(tile.coordinate);
                        }
                    } else {
                        tile.coordinate = slideStep(tile.coordinate);
                    }
                }

                // only need to do a state operation if the tile
                // was actually moved
                if (
                    tile.coordinate.row !== row ||
                    tile.coordinate.col !== col
                ) {
                    state.slides++;

                    if (state.tiles[getTileKey(tile.coordinate)]) {
                        state.tiles[getTileKey(tile.coordinate)].push(tile);
                        state.combinableTiles.push(getTileKey(tile.coordinate));
                    } else {
                        state.tiles[getTileKey(tile.coordinate)] = [tile];
                    }

                    // removes old location from state
                    delete state.tiles[getTileKey({ row, col })];
                }
            }
        }
    }
};

const initialState: GameState = {
    tiles: initializeTiles(),
    score: 0,
    slides: 0,
    combinableTiles: [],
    history: []
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        slide: (state, action: PayloadAction<Direction>) => {
            const history = {
                tiles: cloneDeep(state.tiles),
                score: state.score
            };

            slideTiles(state, action.payload);

            if (state.slides > 0) {
                state.history.push(history);
            }
        },

        combine: (state) => {
            // combine tiles and add to score
            state.combinableTiles.forEach((key) => {
                const [tile] = state.tiles[key];
                state.tiles[key] = [
                    {
                        id: tile.id,
                        coordinate: tile.coordinate,
                        value: tile.value * 2
                    }
                ];

                state.score += tile.value * 2;
            });

            state.combinableTiles = [];

            // don't spawn a new tile if no tiles moved
            if (state.slides > 0) {
                const newTile = spawnRandomAvailableTile(state.tiles);

                if (newTile) {
                    state.tiles[getTileKey(newTile.coordinate)] = [newTile];
                }
            }
        },

        newGame: (state) => {
            state.tiles = initializeTiles();
            state.score = 0;
            state.history = [];
            state.slides = 0;
            state.combinableTiles = [];
        },

        undo: (state) => {
            if (state.history.length > 0) {
                const previous = state.history.pop()!;
                state.tiles = previous.tiles;
                state.score = previous.score;
            }
        }
    }
});

// used for any derived state
const selectState = (state: GameState) => state;

// computed state to determine if the game is over
export const selectIsGameOver = createDraftSafeSelector(
    selectState,
    (state) => {
        // game can only be over if the board is full of tiles
        if (
            Object.keys(state.tiles).length !==
            Game.GRID_SIZE * Game.GRID_SIZE
        ) {
            return false;
        }

        for (let row = 0; row < Game.GRID_SIZE; row++) {
            for (let col = 0; col < Game.GRID_SIZE; col++) {
                const tiles = state.tiles[getTileKey({ row, col })];

                if (tiles) {
                    if (tiles.length > 1) return false;

                    const tile = tiles[0];
                    const coord = tile.coordinate;
                    const adjacentCoords: Coordinate[] = [
                        { row: coord.row + 1, col: coord.col },
                        { row: coord.row, col: coord.col + 1 },
                        { row: coord.row - 1, col: coord.col },
                        { row: coord.row, col: coord.col - 1 }
                    ];

                    for (let i = 0; i < adjacentCoords.length; i++) {
                        const adjacent = getTileAtCoordinate(
                            state.tiles,
                            adjacentCoords[i]
                        );
                        if (adjacent && adjacent.value === tile.value)
                            return false;
                    }
                }
            }
        }

        return true;
    }
);

const { reducer, actions } = gameSlice;
export const { slide, combine, newGame, undo } = actions;
export default reducer;
