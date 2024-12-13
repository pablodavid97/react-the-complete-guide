import MeetupDetail from '../../components/meetups/MeetupDetail';

export const getStaticPaths = async () => {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'm1',
                },
            },
            {
                params: {
                    meetupId: 'm2',
                },
            },
            {
                params: {
                    meetupId: 'm3',
                },
            },
        ],
    };
};

export const getStaticProps = async (context) => {
    // fetch data from an API
    const { meetupId } = context.params;

    return {
        props: {
            meetupData: {
                id: meetupId,
                image: 'https://eu-central-1.linodeobjects.com/tecnohotelnews/2024/06/jorge-fernandez-salas-ChSZETOal-I-unsplash-scaled.jpg',
                title: 'A First Meetup',
                address: 'Some street 12345',
                description: 'The meetup description',
            },
        },
    };
};

const MeetupDetails = ({ meetupData }) => {
    return <MeetupDetail {...meetupData} />;
};

export default MeetupDetails;
