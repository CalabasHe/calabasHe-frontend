import { useEffect, useState } from "react"

 export const useDebounce = (value, delay = 200) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (value.trim().length >= 2) {
                setDebouncedValue(value);
            }
        }, delay);
        return () => clearTimeout(timeout);
    }, [value, delay])

    return debouncedValue
 }