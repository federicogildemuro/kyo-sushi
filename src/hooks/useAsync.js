import { useState, useCallback, useEffect } from 'react';

function useAsync(asyncFunction, dependencies = [], autoExecute = true) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await asyncFunction(...args);
            setData(result);
        } catch (error) {
            setError({
                message: error.response?.data?.message || error.message || 'Error desconocido',
                code: error.response?.status || 500,
            });
        } finally {
            setLoading(false);
        }
    }, [asyncFunction]);

    useEffect(() => {
        if (autoExecute) execute();
    }, dependencies);

    return { data, loading, error, execute };
}

export default useAsync;