import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter';
import classes from './Counter.module.css';

const Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counter.counter);
    const showCounter = useSelector((state) => state.counter.showCounter);

    const handleIncrease = () => {
        dispatch(counterActions.increase(5));
    };

    const handleAdd = () => {
        dispatch(counterActions.add());
    };

    const handleSubtract = () => {
        dispatch(counterActions.subtract());
    };

    const toggleCounterHandler = () => {
        dispatch(counterActions.toggleCounter());
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
