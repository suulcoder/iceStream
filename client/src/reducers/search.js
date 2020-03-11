import * as types from '../types/search'

const search = (state='',action) => {
    switch (action.type) {
        case types.query_changed:
            return action.payload;
        default:
            return state
    }
}

export default search

export const getSearchQuery = state => state;