import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent } from '../../util/http.js';
import { deleteEvent } from '../../util/http.js';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../util/http.js';

import Header from '../Header.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data: event,
        isLoading,
        isError: errorFetching,
        error,
    } = useQuery({
        queryKey: ['event', { id }],
        queryFn: ({ signal }) => fetchEvent({ id, signal }),
    });

    const {
        mutate,
        isPending: isDeleting,
        isError: isDeleteError,
    } = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['events'],
            });
            navigate('/events');
        },
    });

    const handleDeleteEvent = () => {
        mutate({ id });
    };

    let loadingContent;
    let errorContent;

    if (isLoading) {
        loadingContent = (
            <section className='content-section'>
                <p style={{ textAlign: 'center' }}>
                    Loading data please wait...
                </p>
            </section>
        );
    }

    if (isDeleting) {
        loadingContent = (
            <section className='content-section'>
                <p style={{ textAlign: 'center' }}>
                    Deleting event please wait...
                </p>
            </section>
        );
    }

    if (errorFetching) {
        errorContent = (
            <section className='content-section'>
                <ErrorBlock
                    title='An error occurred!'
                    message={error.info?.message || 'Failed to fetch event.'}
                />
            </section>
        );
    }

    if (isDeleteError) {
        errorContent = (
            <ErrorBlock
                title='An error occurred!'
                message='Unable to delete event at the moment, please try again later!'
            />
        );
    }

    return (
        <>
            <Outlet />
            <Header>
                <Link to='/events' className='nav-item'>
                    View all Events
                </Link>
            </Header>
            {errorContent}
            {loadingContent}
            {!isLoading && !errorFetching && (
                <article id='event-details'>
                    <header>
                        <h1>{event.title}</h1>
                        <nav>
                            <button onClick={handleDeleteEvent}>Delete</button>
                            <Link to='edit'>Edit</Link>
                        </nav>
                    </header>
                    <div id='event-details-content'>
                        <img
                            src={`http://localhost:3000/${event.image}`}
                            alt={event.title}
                        />
                        <div id='event-details-info'>
                            <div>
                                <p id='event-details-location'>
                                    {event.location}
                                </p>
                                <time dateTime={`Todo-DateT$Todo-Time`}>
                                    {event.date} {event.time}
                                </time>
                            </div>
                            <p id='event-details-description'>
                                {event.description}
                            </p>
                        </div>
                    </div>
                </article>
            )}
        </>
    );
}
