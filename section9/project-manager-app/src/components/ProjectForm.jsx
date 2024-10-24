import { useState } from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import DatePicker from './DatePicker';
import styles from './ProjectForm.module.css';
import { generateId } from '../util';

const ProjectForm = ({ onCancel, onSave, projects }) => {
    const [project, setProject] = useState({
        id: generateId(),
        title: '',
        description: '',
        dueDate: '',
        tasks: [],
        isActive: false,
    });
    const [validations, setValidations] = useState({
        title: {
            isValid: true,
            message: '',
        },
        dueDate: {
            isValid: true,
            message: '',
        },
    });

    const handleTitleChange = (event) => {
        const { value: newTitle } = event.target;

        setProject((prev) => ({
            ...prev,
            title: newTitle,
        }));

        if (!isProjectTitleUnique(newTitle)) {
            setValidations((prev) => {
                const newTitle = {
                    isValid: false,
                    message: 'Project title must be unique.',
                };

                return {
                    ...prev,
                    title: newTitle,
                };
            });
        }
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

        if (!isDueDateInTheFuture(newDueDate)) {
            setValidations((prev) => {
                const newDueDate = {
                    isValid: false,
                    message: 'Project due date must be in the future.',
                };

                return {
                    ...prev,
                    dueDate: newDueDate,
                };
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(project);
    };

    const isProjectTitleUnique = (title) => {
        let uniqueProject = true;

        for (let existingProject of projects) {
            if (existingProject.title === title) {
                uniqueProject = false;
                break;
            }
        }
        return uniqueProject;
    };

    const isDueDateInTheFuture = (dueDateStr) => {
        const today = new Date();
        const dueDate = new Date(dueDateStr);

        if (dueDate <= today) {
            return false;
        }

        return true;
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
                validation={validations.title}
                required={true}
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
                validation={validations.dueDate}
                required={true}
            />
        </form>
    );
};

export default ProjectForm;
