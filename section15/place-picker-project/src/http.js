export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Something went wrong.');
    }
    return data.places;
}

export async function fetchUserPlaces() {
    const response = await fetch('http://localhost:3000/user-places');
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Something went wrong.');
    }
    return data.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({ places }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to update user data.');
    }

    const data = await response.json();

    return data.message;
}
