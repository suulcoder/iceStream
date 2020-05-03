import * as types from '../types/cart'

const cart = (state={}, action) => {
    switch (action.type){
        case types.ADD_TO_CART:
            return {...state,[action.payload.id]:action.payload.quantity}
        case types.REMOVE_FROM_CART:
            const currentState = state;
            delete currentState[action.payload]
            return currentState
        case types.ADD_MORE:
            return {...state,[action.payload]:state[action.payload]+1}
        case types.REMOVE_PART:
            return {...state,[action.payload]:state[action.payload]-1}
        default:
            return state
    }
}

export default cart

export const getAllCart = state => state;
export const getTracksId = state => Object.keys(state)