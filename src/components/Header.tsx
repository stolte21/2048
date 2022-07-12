import { useState, useEffect } from 'react';
import cn from 'classnames';
import Stat from 'components/Stat';
import Button from 'components/Button';
import { useSelector, useDispatch } from 'hooks/redux';
import { newGame, undo } from 'store/game/gameSlice';
import Tile from 'constants/tile';

const SCORE_KEY = 'rs__2048-best_score';

const Header = () => {
    const [bestScore, setBestScore] = useState(
        () => Number(window.localStorage.getItem(SCORE_KEY)) || 0
    );
    const score = useSelector((state) => state.game.score);
    const history = useSelector((state) => state.game.history);
    const dispatch = useDispatch();

    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score);
            window.localStorage.setItem(SCORE_KEY, score.toString());
        }
    }, [score, bestScore]);

    return (
        <div className="flex justify-center m-4 gap-1">
            <h1
                className={cn(
                    'h-32 w-32 flex justify-center items-center font-bold rounded text-5xl',
                    Tile.Colors[2048].bg
                )}
            >
                2048
            </h1>
            <div>
                <div className="flex gap-2 mx-1 mb-2">
                    <Stat label="Score" text={score} />
                    <Stat label="Best" text={bestScore} />
                </div>
                <div className="flex gap-2 mx-1">
                    <Button
                        variant="secondary"
                        onClick={() => dispatch(newGame())}
                    >
                        New Game
                    </Button>
                    <Button
                        variant="secondary"
                        disabled={history.length === 0}
                        onClick={() => dispatch(undo())}
                    >
                        Undo
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Header;
