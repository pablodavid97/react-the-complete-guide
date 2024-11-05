import { useState, useEffect } from 'react';

export function useFetch(fetchFn, initialValue) {
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState(initialValue);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const response = await fetchFn();
                setData(response);
            } catch (error) {
                setError({
                    message: error.message || 'Failed to fetch data.',
                });
            }

            setIsFetching(false);
        }

        fetchData();
    }, [fetchFn]);

    return {
        isFetching,
        error,
        data,
        setIsFetching,
        setError,
        setData,
    };
}
