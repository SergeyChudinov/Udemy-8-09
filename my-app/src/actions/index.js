export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDelete = (id) => {
    return {
        type: 'HEROES_DELETED',
        payload: id
    }
}
export const heroesAdd = (obj) => {
    return {
        type: 'HEROES_ADD',
        payload: obj
    }
}
export const heroesFilter = (filter) => {
    return {
        type: 'HEROES_FILTER',
        payload: filter
    }
}