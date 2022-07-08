import Game from 'constants/game';
import { Coordinate } from 'types';
import { random } from 'lodash';

export const randomCoordinate = (): Coordinate => {
    return {
        row: random(Game.GRID_SIZE - 1),
        col: random(Game.GRID_SIZE - 1)
    };
};

export const randomIndex = (array: any[]) => {
    return array[random(array.length - 1)];
};

export const flipCoin = () => {
    return random(1) === 1 ? true : false;
};
