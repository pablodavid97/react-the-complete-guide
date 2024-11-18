import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';

const Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counter);
    const showCounter = useSelector((state) => state.showCounter);

    const handleIncrease = () => {
        dispatch({ type: 'increase', amount: 5 });
    };

    const handleAdd = () => {
        dispatch({ type: 'add' });
    };

    const handleSubtract = () => {
        dispatch({ type: 'subtract' });
    };

    const toggleCounterHandler = () => {
        dispatch({ type: 'toggle' });
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {showCounter && <div className={classes.value}>{counter}</div>}
            <div>
                <button onClick={handleSubtract}>-</button>
                <button onClick={handleAdd}>+</button>
                <button onClick={handleIncrease}>Increase by 5</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
