import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import Game from 'constants/game';
import Tile from 'constants/tile';
import { Coordinate } from 'types';

type GridTileProps = {
    variant: 'tile' | 'placeholder';
    coordinate: Coordinate;
    value?: number;
};

const getTileColors = (value?: number) =>
    value && Tile.Colors[value] ? Tile.Colors[value] : Tile.Colors.placeholder;

const GridTile = ({ variant, coordinate, value }: GridTileProps) => {
    const [mounted, setMounted] = useState(variant === 'placeholder');
    const [expanded, setExpanded] = useState(false);
    const prevValue = useRef(value);
    const colors = getTileColors(value);
    const { row, col } = coordinate;
    const x = col * Game.TILE_SIZE_PX + col * Game.GRID_GAP_PX;
    const y = row * Game.TILE_SIZE_PX + row * Game.GRID_GAP_PX;

    const textClass = (() => {
        if (!value) return 'text-7xl';
        else {
            const length = value.toString().length;

            if (length >= 4) {
                return 'text-4xl';
            } else if (length == 3) {
                return 'text-5xl';
            } else {
                return 'text-6xl';
            }
        }
    })();

    useEffect(() => {
        setTimeout(() => setMounted(true), 25);
    }, []);

    useEffect(() => {
        if (value !== prevValue.current) {
            setExpanded(true);

            setTimeout(() => {
                setExpanded(false);
            }, 200);
        }

        prevValue.current = value;
    }, [value]);

    return (
        <div
            style={{
                transform: `translate(${x}px, ${y}px)`,
                height: Game.TILE_SIZE_PX + 'px',
                width: Game.TILE_SIZE_PX + 'px'
            }}
            className={cn('absolute transition-transform ease-in', {
                [`duration-${Game.MOVE_LENGTH_MS}`]: true
            })}
        >
            <div
                className={cn(
                    'flex justify-center items-center font-bold transition-transform w-full h-full',
                    {
                        'scale-110': expanded,
                        'scale-0': !mounted,
                        [colors.text]: true,
                        [colors.bg]: true,
                        [textClass]: true
                    }
                )}
            >
                {value}
            </div>
        </div>
    );
};

export default GridTile;
