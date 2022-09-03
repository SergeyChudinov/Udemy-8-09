import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const srtingMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}
const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }
    return store
}
const time = (store) => (next) => (action) => {
    const deley = action?.meta?.deley;
    if (!deley) {
        return next(action)
    }
    const timout = setTimeout(() => {
        next(action)
    }, deley)
    return () => {
        clearInterval(timout)
    }
}
const reducer = combineReducers({
    heroes: heroes,
    filters: filters
})
const store = createStore(reducer,
                compose(
                    applyMiddleware(ReduxThunk, srtingMiddleware),
                    composeWithDevTools()
                )
            );

export default store;

// composeWithDevTools()