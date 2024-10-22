import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className='sidebar'>
            <h3>Your Projects</h3>
            <button>
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
