import * as types from '../types/search'

export const change_query = (newQuery) => ({
    type: types.query_changed,
    payload: newQuery
})
