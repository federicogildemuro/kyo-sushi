import { useCallback, useEffect, useState } from 'react';

function useAsync(asyncFunction, dependencies = [], autoExecute = true) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setData(null);
        setLoading(true);
        setError(null);
        try {
            const result = await asyncFunction(...args);
            setData(result);
            return result;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [asyncFunction]);

    useEffect(() => {
        if (autoExecute) execute();
    }, [...dependencies]);

    return { data, loading, error, execute };
}

export default useAsync;