import { createStore, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import heroes from '../reducers/heroes';
import filters from '../reducers/filters';


const reducer = combineReducers({
    heroes: heroes,
    filters: filters
})

const store = createStore(reducer, composeWithDevTools());

export default store;