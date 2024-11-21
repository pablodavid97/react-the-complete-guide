import Todos from './components/Todos';
import NewTodo from './components/NewTodo';
import TodosContextProvider from './store/todos-context';

import './App.css';

function App() {
    return (
        <TodosContextProvider>
            <h1>React To Do App</h1>
            <NewTodo />
            <Todos />
        </TodosContextProvider>
    );
}

export default App;
