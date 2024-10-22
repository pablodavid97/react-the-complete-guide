import styles from './ProjectDetails.module.css';

const ProjectDetails = ({ project, onDelete }) => {
    const formatDescription = (description) => {
        return description.split('\n').map((line, index) => (
            <span key={`description-line-${index}`}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <section className={styles['project-details']}>
            <div className={styles['details-header']}>
                <h1>{project.title}</h1>
                <button onClick={onDelete}>Delete</button>
            </div>
            <div className={styles['details-content']}>
                <p className={styles['due-date']}>{project.dueDate}</p>
                <p>{formatDescription(project.description)}</p>
            </div>
            <hr />
        </section>
    );
};

export default ProjectDetails;
