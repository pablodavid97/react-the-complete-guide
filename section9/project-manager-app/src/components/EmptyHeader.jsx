import imgPad from '../assets/no-projects.png';
import './EmptyHeader.css';

const EmptyHeader = () => {
    return (
        <div className='empty-header'>
            <img
                id='noProjectLogo'
                src={imgPad}
                alt='Physical pad with a pen and paper'
            />
            <h1>No Project Selected</h1>
            <p>Select a project or get started with a new one</p>
            <button>Create new project</button>
        </div>
    );
};

export default EmptyHeader;
