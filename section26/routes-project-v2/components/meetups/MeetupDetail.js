import styles from './MeetupDetail.module.css';

const MeetupDetail = ({ id, image, title, address, description }) => {
    return (
        <section className={styles.detail}>
            <img src={image} alt={title} />
            <h1>
                {title} - {id}
            </h1>
            <address>{address}</address>
            <p>{description}</p>
        </section>
    );
};

export default MeetupDetail;
