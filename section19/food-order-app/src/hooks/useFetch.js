import { useState, useEffect, useRef, useCallback } from 'react';

const useFetch = (
    fetchFn,
    options = { method: 'GET', data: {} },
    initialData = []
) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const previousOptionsRef = useRef();

    const areOptionsEqual = (newOptions, oldOptions) => {
        return JSON.stringify(newOptions) === JSON.stringify(oldOptions);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [error]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(null);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [success]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetchFn();
            setData(response);
        } catch (error) {
            setError({
                message: error.message || 'Error when fetching data.',
            });
        }
        setIsLoading(false);
    }, []);

    const sendRequest = useCallback(async (requestData) => {
        if (!requestData) return;

        setIsLoading(true);
        try {
            const response = await fetchFn(requestData);
            setData(response);
            setSuccess({
                message: response.message || 'Success updating data.',
            });
        } catch (error) {
            setError({
                message: error.message || 'Error when fetching data.',
            });
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (
            !previousOptionsRef.current ||
            !areOptionsEqual(options, previousOptionsRef.current)
        ) {
            previousOptionsRef.current = options;

            const fetchFn = async () => {
                if (options.method === 'GET') {
                    await fetchData();
                }

                if (options.method === 'POST') {
                    await sendRequest(options.data);
                }
            };
            fetchFn();
        }
    }, [fetchFn, options, fetchData, sendRequest]);

    return {
        data,
        success,
        error,
        isLoading,
    };
};

export default useFetch;
