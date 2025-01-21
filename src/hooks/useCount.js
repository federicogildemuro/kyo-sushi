import { useState, useEffect } from 'react';

function useCount(initial = 0, min = 0, max = Infinity) {
    const [count, setCount] = useState(() => Math.min(Math.max(initial, min), max));

    useEffect(() => {
        setCount(() => Math.min(Math.max(initial, min), max));
    }, [initial, min, max]);

    const increment = () => setCount((prevCount) => Math.min(prevCount + 1, max));
    const decrement = () => setCount((prevCount) => Math.max(prevCount - 1, min));

    return { count, increment, decrement };
}

export default useCount;