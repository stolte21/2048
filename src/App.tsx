import { useState } from 'react';
import Header from 'components/Header';
import Grid from 'components/Grid';
import useDirectionals from 'hooks/useDirectionals';
import { useDispatch } from 'hooks/redux';
import { slide, combine } from 'store/game/gameSlice';
import Game from 'constants/game';

function App() {
    const [sliding, setSliding] = useState(false);
    //const isGameOver = useSelector((state) => selectIsGameOver(state.game));
    const dispatch = useDispatch();

    useDirectionals((direction) => {
        if (!sliding) {
            setSliding(true);
            dispatch(slide(direction));

            setTimeout(() => {
                dispatch(combine());
                setSliding(false);
            }, Game.MOVE_LENGTH_MS);
        }
    });

    return (
        <main className="mt-4">
            <div className="container mx-auto min-w-full">
                <Header />
                <Grid />
            </div>
        </main>
    );
}

export default App;
