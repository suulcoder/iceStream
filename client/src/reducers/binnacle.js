import * as types from '../types/binnacle'

const binnacle = (state={}, action) => {
    switch (action.type){
        case types.ADD_TO_BINNACLE:
            return {...state,[action.payload.indate+action.payload.action+action.payload.id]:action.payload}
        case types.SET_TO_NULL:
            return {}
        default:
            return state
    }
}

export default binnacle

export const getBinnacle = state => Object.values(state)