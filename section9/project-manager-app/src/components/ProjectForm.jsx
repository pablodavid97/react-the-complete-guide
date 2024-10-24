import { useState, useRef } from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import DatePicker from './DatePicker';
import styles from './ProjectForm.module.css';
import { generateId } from '../util';

const ProjectForm = ({ onCancel, onSave, projects }) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();
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
        } else {
            setValidations((prev) => ({
                ...prev,
                title: {
                    isValid: true,
                    message: '',
                },
            }));
        }
    };

    const handleDueDateChange = (event) => {
        const { value: newDueDate } = event.target;

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
        } else {
            setValidations((prev) => ({
                ...prev,
                dueDate: {
                    isValid: true,
                    message: '',
                },
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({
            id: generateId(),
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            dueDate: dueDateRef.current.value,
            tasks: [],
            isActive: false,
        });
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

    const isFormValid = () => {
        console.log('validations: ', validations);
        let isValid = true;
        Object.values(validations).forEach((validation) => {
            if (!validation.isValid) {
                isValid = false;
            }
        });

        return isValid;
    };

    console.log('is form valid?: ', isFormValid());

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
                <button
                    className={`${
                        !isFormValid()
                            ? styles['btn-disabled']
                            : styles['btn-primary']
                    }`}
                    type='submit'
                    disabled={!isFormValid()}
                >
                    Save
                </button>
            </div>
            <TextInput
                label='Title'
                ref={titleRef}
                onChange={handleTitleChange}
                validation={validations.title}
                required={true}
            />
            <TextArea label='Description' ref={descriptionRef} />
            <DatePicker
                label='Due date'
                ref={dueDateRef}
                onChange={handleDueDateChange}
                validation={validations.dueDate}
                required={true}
            />
        </form>
    );
};

export default ProjectForm;
