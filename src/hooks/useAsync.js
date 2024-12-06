import { useState, useEffect } from 'react'

function useAsync(asyncFunction, dependencies = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const execute = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await asyncFunction(...args);
            setData(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        execute();
    }, dependencies);

    return { data, loading, error, execute }
}

export default useAsync