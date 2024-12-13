import NewMeetupForm from '../../components/meetups/NewMeetupForm.js';

const NewMeetupPage = () => {
    const addMeetupHandler = (meetup) => {
        console.log('meetup: ', meetup);
    };

    return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
