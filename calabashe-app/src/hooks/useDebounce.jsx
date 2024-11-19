import { useRef, useEffect } from "react";

export function useDebounce(callback, delay) {
    const debouncedFn = useRef(null);
    const cancelTimeout = () => {
        if (debouncedFn.current) {
            clearTimeout(debouncedFn.current);
        }
    };

    useEffect(() => {
        return () => cancelTimeout();
    }, []);

    return (value) => {
        cancelTimeout();
        
        debouncedFn.current = setTimeout(() => {
            callback(value);
        }, delay);
    };
}