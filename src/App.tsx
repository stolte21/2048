import Grid from 'components/Grid';
import useDirectionals from 'hooks/useDirectionals';
import { useSelector, useDispatch } from 'hooks/redux';
import { slide, combine, undo, selectIsGameOver } from 'store/game/gameSlice';
import Game from 'constants/game';

function App() {
    const score = useSelector((state) => state.game.score);
    const isGameOver = useSelector((state) => selectIsGameOver(state.game));
    const dispatch = useDispatch();

    // TODO: implement a queue
    useDirectionals((direction) => {
        dispatch(slide(direction));

        setTimeout(() => {
            dispatch(combine());
        }, Game.MOVE_LENGTH_MS);
    });

    return (
        <div className="m-8">
            <div className="container mx-auto">
                <h1>2048</h1>
                <div>
                    <h2>{score}</h2>
                    <h2>Game Over: {JSON.stringify(isGameOver)}</h2>
                </div>
                <button onClick={() => dispatch(undo())}>Undo</button>
                <Grid />
            </div>
        </div>
    );
}

export default App;
