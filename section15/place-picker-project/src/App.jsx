import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces, fetchUserPlaces } from './http.js';
import ErrorPage from './components/Error.jsx';

function App() {
    const selectedPlace = useRef();

    const [userPlaces, setUserPlaces] = useState([]);
    const [updateError, setUpdateError] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [arePlacesLoading, setArePlacesLoading] = useState();
    const [userPlacesError, setUserPlacesError] = useState();

    useEffect(() => {
        const fetchPlaces = async () => {
            setArePlacesLoading(true);
            try {
                const fetchedPlaces = await fetchUserPlaces();
                setUserPlaces(fetchedPlaces);
            } catch (error) {
                setUserPlacesError({
                    message: error.message || 'Failed to fetch user places.',
                });
            }
            setArePlacesLoading(false);
        };
        fetchPlaces();
    }, []);

    function handleStartRemovePlace(place) {
        setModalIsOpen(true);
        selectedPlace.current = place;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false);
    }

    async function handleSelectPlace(selectedPlace) {
        setUserPlaces((prevPickedPlaces) => {
            if (!prevPickedPlaces) {
                prevPickedPlaces = [];
            }
            if (
                prevPickedPlaces.some((place) => place.id === selectedPlace.id)
            ) {
                return prevPickedPlaces;
            }
            return [selectedPlace, ...prevPickedPlaces];
        });

        try {
            await updateUserPlaces([selectedPlace, ...userPlaces]);
        } catch (error) {
            setUserPlaces(userPlaces);
            setUpdateError({
                message: error.message || 'Failed to update places',
            });
        }
    }

    const handleRemovePlace = useCallback(
        async function handleRemovePlace() {
            setUserPlaces((prevPickedPlaces) =>
                prevPickedPlaces.filter(
                    (place) => place.id !== selectedPlace.current.id
                )
            );

            try {
                await updateUserPlaces(
                    userPlaces.filter(
                        (place) => place.id !== selectedPlace.current.id
                    )
                );
            } catch (error) {
                setUserPlaces(userPlaces);
                setUpdateError({
                    message: error.message || 'Failed to delete place.',
                });
            }

            setModalIsOpen(false);
        },
        [userPlaces]
    );

    const handleErrorClose = () => {
        setUpdateError(null);
    };

    return (
        <>
            <Modal open={updateError} onClose={handleErrorClose}>
                {updateError && (
                    <ErrorPage
                        title='Something went wrong'
                        message={updateError.message}
                        onConfirm={handleErrorClose}
                    />
                )}
            </Modal>
            <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
                <DeleteConfirmation
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>

            <header>
                <img src={logoImg} alt='Stylized globe' />
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to
                    visit or you have visited.
                </p>
            </header>
            <main>
                {userPlacesError && (
                    <ErrorPage
                        title='An error ocurred!'
                        message={userPlacesError.message}
                    />
                )}
                {!userPlacesError && (
                    <Places
                        title="I'd like to visit ..."
                        fallbackText='Select the places you would like to visit below.'
                        places={userPlaces}
                        isLoading={arePlacesLoading}
                        loadingText='Fetching your places...'
                        onSelectPlace={handleStartRemovePlace}
                    />
                )}

                <AvailablePlaces onSelectPlace={handleSelectPlace} />
            </main>
        </>
    );
}

export default App;
