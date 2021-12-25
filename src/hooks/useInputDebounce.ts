import { useState, useEffect } from "react";

/**
 * Hook that returns the value after the delay.
 * All intermediate values will be skipped.
 * And the last one will be returned.
 */
function useInputDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    });

    return debouncedValue;
};

export default useInputDebounce;