import styles from './Sidebar.module.css';

const Sidebar = ({ onCreate, projects, onSelectProject }) => {
    console.log('Sidebar re-rendered with projects: ', projects);
    return (
        <aside className={styles.sidebar}>
            <h3>Your Projects</h3>
            <button className={styles.createBtn} onClick={onCreate}>
                <span>+</span>Add Project
            </button>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <button
                            className={styles['project-btn']}
                            onClick={() => onSelectProject(project)}
                        >
                            {project.title}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
