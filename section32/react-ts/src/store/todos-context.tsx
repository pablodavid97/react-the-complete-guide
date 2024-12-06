import { createContext, useState } from 'react';
import Todo from '../models/todo';

type TodosDefaultContext = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
};

export const TodosContext = createContext<TodosDefaultContext>({
    items: [],
    addTodo: (text: string) => {},
    removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAddTodo = (todoText: string) => {
        const idVal = String(todos.length + 1);
        const newTodo = { id: idVal, text: todoText };

        setTodos((prev) => [newTodo, ...prev]);
    };

    const handleRemoveTodo = (todoId: string) => {
        const newList = todos.filter((todo) => todo.id !== todoId);

        setTodos(newList);
    };
    const ctxValue: TodosDefaultContext = {
        items: todos,
        addTodo: handleAddTodo,
        removeTodo: handleRemoveTodo,
    };
    return (
        <TodosContext.Provider value={ctxValue}>
            {children}
        </TodosContext.Provider>
    );
};

export default TodosContextProvider;
