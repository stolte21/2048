import { flatten } from 'lodash';
import Game from 'constants/game';
import GridTile from 'components/GridTile';
import { useSelector } from 'hooks/redux';

const Grid = () => {
    const tiles = useSelector((state) =>
        flatten(
            Object.keys(state.game.tiles).map((key) => state.game.tiles[key])
            // for some reason the tiles don't animate of the keys
            // don't maintain the same order
        ).sort((a, b) => (a.id > b.id ? 1 : -1))
    );

    return (
        <div className="flex justify-center">
            <div
                style={{
                    height: Game.GRID_SIZE_PX + 'px',
                    width: Game.GRID_SIZE_PX + 'px',
                    padding: Game.GRID_GAP_PX + 'px'
                }}
                className="relative bg-zinc-700"
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
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Grid;
