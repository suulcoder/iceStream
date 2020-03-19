import * as types from '../types/spotify'

export const setToken = (token) => ({
    type: types.token_setted,
    payload: token
})