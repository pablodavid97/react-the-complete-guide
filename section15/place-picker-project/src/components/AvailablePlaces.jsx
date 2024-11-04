import { useState, useEffect } from 'react';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const fetchedPlaces = await fetchAvailablePlaces();
                navigator.geolocation.getCurrentPosition((position) => {
                    const sortedPlaces = sortPlacesByDistance(
                        fetchedPlaces,
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    setAvailablePlaces(sortedPlaces);
                    setIsLoading(false);
                });
            } catch (error) {
                setError({
                    message:
                        error.message ||
                        'Could not fetch places, please try again later. ',
                });
            }
        };
        fetchData();
    }, []);

    if (error) {
        return (
            <ErrorPage title='Something went wrong' message={error.message} />
        );
    }

    return (
        <Places
            title='Available Places'
            places={availablePlaces}
            fallbackText='No places available.'
            isLoading={isLoading}
            loadingText='Fetching places data...'
            onSelectPlace={onSelectPlace}
        />
    );
}
