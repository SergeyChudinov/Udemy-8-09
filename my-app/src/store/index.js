import { createStore, combineReducers, compose } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

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

const reducer = combineReducers({
    heroes: heroes,
    filters: filters
})

const store = createStore(reducer,
              compose(
                enhancer,
                composeWithDevTools()
              ));

export default store;

// composeWithDevTools()