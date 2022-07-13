import { useState, useEffect } from 'react';
import Header from 'components/Header';
import Grid from 'components/Grid';
import Modal from 'components/Modal';
import useDirectionals from 'hooks/useDirectionals';
import { useDispatch, useSelector } from 'hooks/redux';
import {
    slide,
    combine,
    newGame,
    selectIsGameOver
} from 'store/game/gameSlice';
import Game from 'constants/game';

function App() {
    const [sliding, setSliding] = useState(false);
    const score = useSelector((state) => state.game.score);
    const isGameOver = useSelector((state) => selectIsGameOver(state.game));
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isGameOver) {
            setTimeout(() => {
                setShowModal(true);
            }, 750);
        } else {
            setShowModal(false);
        }
    }, [isGameOver]);

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
            <Modal
                isOpen={showModal}
                text={`Game Over! Your score was ${score}`}
                actions={[
                    {
                        text: 'New Game',
                        type: 'primary',
                        onClick: (e) => dispatch(newGame())
                    }
                ]}
            />
        </main>
    );
}

export default App;
