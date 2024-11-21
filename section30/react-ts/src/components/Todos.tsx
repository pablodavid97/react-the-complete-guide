import { useContext } from 'react';
import TodoItem from './TodoItem';
import { TodosContext } from '../store/todos-context';

const Todos = () => {
    const { items } = useContext(TodosContext);
    return (
        <ul className='list'>
            {items.map(({ id, text }) => {
                return <TodoItem key={id} id={id} text={text} />;
            })}
        </ul>
    );
};

export default Todos;
