import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
    const [value, setValue] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const handler = () => setValue(mediaQuery.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, [query, setValue]);
    return value;
};

export default useMediaQuery;
