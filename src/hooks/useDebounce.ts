import { useEffect, useState } from "react";

export function useDebounce(value: any, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        setIsPending(true);

        const timeout = setTimeout(() => {
            setDebouncedValue(value);
            setIsPending(false);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return {
        debouncedValue,
        isPending,
        isReady: !isPending,
    };
}