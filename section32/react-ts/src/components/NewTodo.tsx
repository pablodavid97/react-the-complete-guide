import React, { useRef, useContext } from 'react';
import { TodosContext } from '../store/todos-context';

const NewTodo = () => {
    const { addTodo } = useContext(TodosContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredText = inputRef.current!.value;

        if (enteredText.trim().length === 0) {
            // throw an error
            return;
        }

        addTodo(enteredText);
        inputRef.current!.value = '';
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <label htmlFor='text'>Todo text</label>
            <input id='text' type='text' ref={inputRef} />
            <button>Add Todo</button>
        </form>
    );
};

export default NewTodo;
