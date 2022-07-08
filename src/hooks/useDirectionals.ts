import { useEffect, useRef } from 'react';
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
