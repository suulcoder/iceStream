import * as types from '../types/binnacle'

export const add = (element) => {
    return({
    type: types.ADD_TO_BINNACLE,
    payload: element
})}

export const toNull = () => ({
    type: types.SET_TO_NULL
})
