import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import Game from 'constants/game';
import Tile from 'constants/tile';
import { Coordinate } from 'types';

type GridTileProps = {
    variant: 'tile' | 'placeholder';
    coordinate: Coordinate;
    value?: number;
    size: number;
};

const getTileColors = (value?: number) =>
    value && Tile.Colors[value] ? Tile.Colors[value] : Tile.Colors.placeholder;

const GridTile = ({
    variant,
    coordinate,
    value,
    size = Game.TILE_SIZE_PX
}: GridTileProps) => {
    const [mounted, setMounted] = useState(variant === 'placeholder');
    const [expanded, setExpanded] = useState(false);
    const prevValue = useRef(value);
    const colors = getTileColors(value);
    const { row, col } = coordinate;
    const x = col * size + col * Game.GRID_GAP_PX;
    const y = row * size + row * Game.GRID_GAP_PX;

    const textClass = (() => {
        if (!value) return 'text-5xl';
        else {
            const length = value.toString().length;

            if (length >= 4) {
                return 'text-2xl';
            } else if (length === 3) {
                return 'text-3xl';
            } else {
                return 'text-4xl';
            }
        }
    })();

    const bigTextClass = (() => {
        if (!value) return 'sm:text-7xl';
        else {
            const length = value.toString().length;

            if (length >= 4) {
                return 'sm:text-4xl';
            } else if (length === 3) {
                return 'sm:text-5xl';
            } else {
                return 'sm:text-6xl';
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
                height: size + 'px',
                width: size + 'px'
            }}
            className={cn('absolute transition-transform ease-in')}
        >
            <div
                className={cn(
                    'flex justify-center items-center font-bold transition-transform w-full h-full rounded',
                    {
                        'scale-110': expanded,
                        'scale-0': !mounted,
                        [colors.text]: true,
                        [colors.bg]: true,
                        [textClass]: true,
                        [bigTextClass]: true
                    }
                )}
            >
                {value}
            </div>
        </div>
    );
};

export default GridTile;
