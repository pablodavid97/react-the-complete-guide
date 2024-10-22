import styles from './Sidebar.module.css';

const Sidebar = ({ onCreate, projects }) => {
    console.log('Sidebar re-rendered with projects: ', projects);
    return (
        <aside className={styles.sidebar}>
            <h3>Your Projects</h3>
            <button onClick={onCreate}>
                <span>+</span>Add Project
            </button>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>{project.title}</li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
