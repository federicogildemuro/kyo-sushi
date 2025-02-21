import { useState, useEffect } from 'react';

// Custom hook to manage a count state with increment and decrement functions
function useCount(initial = 0, min = 0, max = Infinity) {
    // State to store the current count, initialized within the bounds of min and max
    const [count, setCount] = useState(() => Math.min(Math.max(initial, min), max));

    // Update the count whenever the initial, min, or max values change
    useEffect(() => {
        setCount(() => Math.min(Math.max(initial, min), max));
    }, [initial, min, max]);

    // Function to increment the count, ensuring it doesn't exceed max
    const increment = () => {
        setCount((prevCount) => Math.min(prevCount + 1, max));
    };

    // Function to decrement the count, ensuring it doesn't go below min
    const decrement = () => {
        setCount((prevCount) => Math.max(prevCount - 1, min));
    };

    return { count, increment, decrement };
}

export default useCount;