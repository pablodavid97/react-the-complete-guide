import React, { useContext } from 'react';
import { TodosContext } from '../store/todos-context';

type Props = {
    id: string;
    text: string;
};

const TodoItem: React.FC<Props> = ({ id, text }) => {
    const { removeTodo } = useContext(TodosContext);
    const handleRemove = () => {
        removeTodo(id);
    };
    return (
        <li className='list-item'>
            <button onClick={handleRemove}>{text}</button>
        </li>
    );
};

export default TodoItem;
