import { useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Direction } from 'types';

type ArrowKeyCode = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';

const arrowKeyCodes = new Set<ArrowKeyCode>([
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeft'
]);

const arrowKeyCodeDirectionMap: Record<ArrowKeyCode, Direction> = {
    ArrowUp: 'up',
    ArrowRight: 'right',
    ArrowDown: 'down',
    ArrowLeft: 'left'
};

const useDirectionals = (callback: (direction: Direction) => void) => {
    const callbackRef = useRef(callback);

    const { ref } = useSwipeable({
        onSwipedUp: () => callbackRef.current('up'),
        onSwipedRight: () => callbackRef.current('right'),
        onSwipedDown: () => callbackRef.current('down'),
        onSwipedLeft: () => callbackRef.current('left')
    });

    useEffect(() => {
        // @ts-expect-error
        ref(document);
    }, [ref]);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            // @ts-expect-error
            if (arrowKeyCodes.has(e.code)) {
                const arrowKeyCode = e.code as ArrowKeyCode;
                callbackRef.current(arrowKeyCodeDirectionMap[arrowKeyCode]);
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => document.removeEventListener('keydown', handleKeydown);
    }, []);
};

export default useDirectionals;
