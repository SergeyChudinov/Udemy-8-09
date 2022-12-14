import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import filters from '../components/heroesFilters/filtersSlice';

import { apiSlice } from '../api/apiSlice'; //+

const stringMiddleware = (store) => (next) => (action) => {
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


const store = configureStore({
    reducer: {filters,
             [apiSlice.reducerPath]: apiSlice.reducer},   //+
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),     //+
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;

