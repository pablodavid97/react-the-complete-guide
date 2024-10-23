import Tasks from './Tasks';

import styles from './ProjectDetails.module.css';

const ProjectDetails = ({ project, onClearTask, onAddTask, onDelete }) => {
    const formatDescription = (description) => {
        return description.split('\n').map((line, index) => (
            <span key={`description-line-${index}`}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className={styles['project-details']}>
            <section>
                <div className={styles['details-header']}>
                    <h1>{project.title}</h1>
                    <button onClick={onDelete}>Delete</button>
                </div>
                <div className={styles['details-content']}>
                    <p className={styles['due-date']}>{project.dueDate}</p>
                    <p>{formatDescription(project.description)}</p>
                </div>
            </section>
            <hr />
            <Tasks
                projectId={project.id}
                tasks={project.tasks}
                onAddTask={onAddTask}
                onClearTask={onClearTask}
            />
        </div>
    );
};

export default ProjectDetails;
