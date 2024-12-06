const redux = require('redux');

const counterReducer = (state = { counter: 0 }, action) => {
    if (action.type === 'add') {
        return {
            counter: state.counter + 1,
        };
    }
    if (action.type === 'substract') {
        return {
            counter: state.counter - 1,
        };
    }

    return state;
};

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: 'add' });
store.dispatch({ type: 'substract' });
store.dispatch({ type: 'add' });
store.dispatch({ type: 'add' });
