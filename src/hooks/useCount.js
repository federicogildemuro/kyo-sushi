import { useState } from 'react'

function useCount(initial = 0, min = 0, max = Infinity) {
    const validInitial = Math.min(Math.max(initial, min), max);
    const [count, setCount] = useState(validInitial);

    const increment = () => setCount((prevCount) => Math.min(prevCount + 1, max));

    const decrement = () => setCount((prevCount) => Math.max(prevCount - 1, min));

    return { count, increment, decrement }
}

export default useCount