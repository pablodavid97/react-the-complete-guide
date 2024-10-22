const ProjectForm = ({ onCancel }) => {
    return (
        <form>
            <div>
                <button onClick={onCancel}>Cancel</button>
                <button>Save</button>
            </div>
            <input type='text' />
            <textarea />
            <input type='date' />
        </form>
    );
};

export default ProjectForm;
