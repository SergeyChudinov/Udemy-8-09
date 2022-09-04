import { createReducer } from "@reduxjs/toolkit";

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDelete,
    heroesAdd
} from '../actions';
const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, {
    [heroesFetching]: state => {state.heroesLoadingStatus = 'loading'},
    [heroesFetched]: (state, action) => {
                    state.heroesLoadingStatus = 'idle';
                    state.heroes = action.payload;
                },
    [heroesFetchingError]: state => {state.heroesLoadingStatus = 'error'},
    [heroesDelete]: (state, action) => {state.heroes = state.heroes.filter(el => el.id !== action.payload)},
    [heroesAdd]: (state, action) => {state.heroes.push(action.payload)},
    },
    [],
    state => state
)


// const heroes = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => {
//             state.heroesLoadingStatus = 'loading';
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroesLoadingStatus = 'idle';
//             state.heroes = action.payload;
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingStatus = 'error';
//         })
//         .addCase(heroesDelete, (state, action) => {
//             state.heroes = state.heroes.filter(el => el.id !== action.payload);
//         })
//         .addCase(heroesAdd, (state, action) => {
//             state.heroes.push(action.payload);
//         })
//         .addDefaultCase(() => {})
// })

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HEROES_DELETED':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(el => el.id !== action.payload),
                
//             }
//         case 'HEROES_ADD':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
                
//             }         
//         default: return state
//     }
// }

export default heroes;