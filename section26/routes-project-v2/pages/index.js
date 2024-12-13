import MeetupList from '../components/meetups/MeetupList.js';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://eu-central-1.linodeobjects.com/tecnohotelnews/2024/06/jorge-fernandez-salas-ChSZETOal-I-unsplash-scaled.jpg',
        address: 'Test Address 12345 st',
        description: 'This is a first meetup',
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://eu-central-1.linodeobjects.com/tecnohotelnews/2024/06/jorge-fernandez-salas-ChSZETOal-I-unsplash-scaled.jpg',
        address: 'Test Address 12345 st',
        description: 'This is a second meetup',
    },
    {
        id: 'm3',
        title: 'A Third Meetup',
        image: 'https://eu-central-1.linodeobjects.com/tecnohotelnews/2024/06/jorge-fernandez-salas-ChSZETOal-I-unsplash-scaled.jpg',
        address: 'Test Address 12345 st',
        description: 'This is a third meetup',
    },
];

export const getStaticProps = async () => {
    // fetch data from an API
    return {
        props: {
            meetups: DUMMY_MEETUPS,
        },
        revalidate: 10,
    };
};

// export const getServerSideProps = async (context) => {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     };
// };

const HomePage = ({ meetups }) => {
    return <MeetupList meetups={meetups} />;
};

export default HomePage;
