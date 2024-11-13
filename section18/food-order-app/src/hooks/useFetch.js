import { useState, useEffect, useRef } from 'react';

const useFetch = (fetchFn, options = { method: 'GET', data: {} }) => {
    const [data, setData] = useState([]);
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
        }, [3000]);

        return () => {
            clearTimeout(timer);
        };
    }, [error]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(null);
        }, [3000]);

        return () => {
            clearTimeout(timer);
        };
    }, [success]);

    useEffect(() => {
        if (
            !previousOptionsRef.current ||
            !areOptionsEqual(options, previousOptionsRef.current)
        ) {
            previousOptionsRef.current = options;

            const fetchData = async () => {
                if (options.method === 'GET') {
                    setIsLoading(true);
                    try {
                        const response = await fetchFn();
                        setData(response);
                    } catch (error) {
                        setError({
                            message:
                                error.message || 'Error when fetching data.',
                        });
                    }
                    setIsLoading(false);
                }

                if (options.method === 'POST') {
                    if (!options.data) return;

                    setIsLoading(true);
                    try {
                        const response = await fetchFn(options.data);
                        setData(response);
                        setSuccess({
                            message:
                                response.message || 'Success updating data.',
                        });
                    } catch (error) {
                        setError({
                            message:
                                error.message || 'Error when fetching data.',
                        });
                    }
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, [fetchFn, options]);

    return {
        data,
        success,
        error,
        isLoading,
    };
};

export default useFetch;
