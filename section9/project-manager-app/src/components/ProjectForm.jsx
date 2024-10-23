import { useState } from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import DatePicker from './DatePicker';
import styles from './ProjectForm.module.css';
import { generateId } from '../util';

const ProjectForm = ({ onCancel, onSave }) => {
    const [project, setProject] = useState({
        id: generateId(),
        title: '',
        description: '',
        dueDate: '',
        tasks: [],
        isActive: false,
    });

    const handleTitleChange = (event) => {
        const { value: newTitle } = event.target;
        setProject((prev) => ({
            ...prev,
            title: newTitle,
        }));
    };

    const handleDescriptionChange = (event) => {
        const { value: newDescription } = event.target;
        setProject((prev) => ({
            ...prev,
            description: newDescription,
        }));
    };

    const handleDueDateChange = (event) => {
        const { value: newDueDate } = event.target;
        setProject((prev) => ({
            ...prev,
            dueDate: newDueDate,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(project);
    };

    return (
        <form className={styles['project-form']} onSubmit={handleSubmit}>
            <div className={styles['form-buttons']}>
                <button
                    className={styles['btn-secondary']}
                    type='button'
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button className={styles['btn-primary']} type='submit'>
                    Save
                </button>
            </div>
            <TextInput
                label='Title'
                value={project.title}
                onChange={handleTitleChange}
            />
            <TextArea
                label='Description'
                value={project.description}
                onChange={handleDescriptionChange}
            />
            <DatePicker
                label='Due date'
                value={project.dueDate}
                onChange={handleDueDateChange}
            />
        </form>
    );
};

export default ProjectForm;
