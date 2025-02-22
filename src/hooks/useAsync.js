import { useCallback, useEffect, useState } from 'react';

// Custom hook to handle async operations in a React component
function useAsync(asyncFunction, dependencies = [], autoExecute = true) {
    // States to store the result, loading state and error of the async operation
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to execute the async operation and manage the states
    const execute = useCallback(async (...args) => {
        // Reset states before starting the async operation
        setData(null);
        setLoading(true);
        setError(null);
        try {
            // Call the async function and set the result in the data state
            const result = await asyncFunction(...args);
            setData(result);
            return result;
        } catch (error) {
            // If an error occurs, store it in the error state
            setError(error);
        } finally {
            // Set loading to false once the operation is completed (either success or failure)
            setLoading(false);
        }
    }, [asyncFunction]);

    // Automatically execute the async function when the component mounts or dependencies change based on the autoExecute flag
    useEffect(() => {
        if (autoExecute) execute();
    }, [...dependencies]);

    return { data, loading, error, execute };
}

export default useAsync;