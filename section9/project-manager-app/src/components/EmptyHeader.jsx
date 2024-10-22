import imgPad from '../assets/no-projects.png';
import styles from './EmptyHeader.module.css';

const EmptyHeader = ({ onCreate }) => {
    return (
        <div className={styles['empty-header']}>
            <img src={imgPad} alt='Physical pad with a pen and paper' />
            <h1>No Project Selected</h1>
            <p>Select a project or get started with a new one</p>
            <button onClick={onCreate}>Create new project</button>
        </div>
    );
};

export default EmptyHeader;
