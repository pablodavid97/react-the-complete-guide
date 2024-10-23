import { useState } from 'react';
import { generateId } from '../util';

import styles from './Tasks.module.css';

const Tasks = ({ projectId, tasks, onClearTask, onAddTask }) => {
    const [taskText, setTaskText] = useState('');

    const handleInputChange = (event) => {
        const { value: inputText } = event.target;
        setTaskText(inputText);
    };

    const handleAddTask = () => {
        const newTask = {
            id: generateId(),
            projectId: projectId,
            text: taskText,
            isActive: true,
        };
        setTaskText('');
        onAddTask(newTask);
    };

    return (
        <section className={styles['tasks-section']}>
            <h2>Tasks</h2>
            <div>
                <input
                    type='text'
                    value={taskText}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <ul className={styles['tasks-list']}>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span
                            className={!task.isActive ? styles.clearedTask : ''}
                        >
                            {task.text}
                        </span>
                        {task.isActive && (
                            <button onClick={() => onClearTask(task)}>
                                Clear
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Tasks;
