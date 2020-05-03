import * as types from '../types/cart'

export const addToCart = (id,quantity) => {
    return({
    type: types.ADD_TO_CART,
    payload: {id,quantity}
})}

export const removeFromCart = (id) => ({
    type: types.REMOVE_FROM_CART,
    payload: id
})

export const addMore = (id) => ({
    type: types.ADD_MORE,
    payload: id
})

export const removePart = (id) => ({
    type: types.REMOVE_PART,
    payload: id
})