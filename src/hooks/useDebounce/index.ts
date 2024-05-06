import { useState, useEffect } from 'react';

export function useDebounce<T extends unknown[]>(
    callback: (...args: T) => void,
    delay: number
): (...args: T) => void {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const debouncedCallback = (...args: T) => {
        if (timer) clearTimeout(timer);
        setTimer(setTimeout(() => callback(...args), delay));
    };

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [timer]);

    return debouncedCallback;
}
