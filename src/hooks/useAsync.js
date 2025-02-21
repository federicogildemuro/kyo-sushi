import { useCallback, useEffect, useState } from 'react';

// Custom hook to handle async operations in a React component
function useAsync(asyncFunction, dependencies = [], autoExecute = true) {
    // State to store the result of the async operation
    const [data, setData] = useState(null);
    // State to track if the async operation is in progress
    const [loading, setLoading] = useState(false);
    // State to store any errors that may occur during the async operation
    const [error, setError] = useState(null);

    // Function to execute the async operation and manage the states
    const execute = useCallback(async (...args) => {
        // Reset states before starting the async operation
        setData(null);
        setLoading(true);
        setError(null);

        try {
            // Call the async function and store the result in the data state
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