import { flatten } from 'lodash';
import Game from 'constants/game';
import GridTile from 'components/GridTile';
import { useSelector } from 'hooks/redux';
import useMediaQuery from 'hooks/useMediaQuery';

const Grid = () => {
    const tiles = useSelector((state) =>
        flatten(
            Object.keys(state.game.tiles).map((key) => state.game.tiles[key])
            // for some reason the tiles don't animate of the keys
            // don't maintain the same order
        ).sort((a, b) => (a.id > b.id ? 1 : -1))
    );
    const isBiggerScreen = useMediaQuery('(min-width: 640px)');
    const tileSizePx = isBiggerScreen
        ? Game.TILE_SIZE_PX_BIG
        : Game.TILE_SIZE_PX;
    const gridSizePx =
        Game.GRID_SIZE * tileSizePx +
        Game.GRID_SIZE * Game.GRID_GAP_PX +
        Game.GRID_GAP_PX;

    return (
        <div className="flex justify-center">
            <div
                style={{
                    height: gridSizePx + 'px',
                    width: gridSizePx + 'px',
                    padding: Game.GRID_GAP_PX + 'px',
                    minWidth: gridSizePx + 'px'
                }}
                className="relative bg-zinc-700 rounded"
            >
                <div
                    style={{
                        padding: Game.GRID_GAP_PX + 'px'
                    }}
                    className="absolute top-0 left-0 w-full h-full"
                >
                    {Game.GRID_PLACEHOLDER.map((_, row) =>
                        _.map((_, col) => {
                            return (
                                <GridTile
                                    key={row + '-' + col}
                                    variant="placeholder"
                                    coordinate={{ row, col }}
                                    size={tileSizePx}
                                />
                            );
                        })
                    )}
                    {tiles.map((tile) => (
                        <GridTile
                            key={tile.id}
                            variant="tile"
                            coordinate={tile.coordinate}
                            value={tile.value}
                            size={tileSizePx}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Grid;
