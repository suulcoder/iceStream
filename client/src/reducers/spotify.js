import * as types from '../types/spotify'

const spotify = (state=null,action) => {
    switch (action.type) {
        case types.token_setted:
            return action.payload;
        default:
            return state
    }
}

export default spotify

export const getToken = state => state;