import styles from './Sidebar.module.css';

const Sidebar = ({ onCreate }) => {
    return (
        <aside className={styles.sidebar}>
            <h3>Your Projects</h3>
            <button onClick={onCreate}>
                <span>+</span>Add Project
            </button>
            <ul>
                <li>Project 1</li>
                <li>Project 2</li>
                <li>Project 3</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
