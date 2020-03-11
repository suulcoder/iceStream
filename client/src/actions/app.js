import * as types from '../types/app'

export const changeState = (index) => ({
    type: types.appState_Changed,
    payload: index
})