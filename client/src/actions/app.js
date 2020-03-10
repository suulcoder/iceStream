import * as types from '../types/app'

export const getState = (index) => ({
    type: types.appState_Changed,
    payload: index
})