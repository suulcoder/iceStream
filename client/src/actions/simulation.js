import * as types from '../types/simulation'

export const setLodaer = (value) => ({
    type: types.IS_LOADDING,
    payload: value
})

export const setDone = (value) => ({
    type: types.SET_DONE,
    payload: value
})

export const setSells = (value) => ({
    type: types.SET_DAILY_SELLS,
    payload: value
})

export const setPlays = (value) => ({
    type: types.SET_DAILY_PLAYS,
    payload: value
})

export const setDays = (value) => ({
    type: types.SET_DAYS,
    payload: value
})

export const setAction = (value) => ({
    type: types.SET_ACTION,
    payload: value
})

export const setValidTracks = (value) => ({
    type: types.SET_VALID_TRACKS,
    payload: value
})

export const setValidUsers = (value) => ({
    type: types.SET_VALID_USERS,
    payload: value
})

export const setNull = () =>({
    type: types.SET_NULL
})

export const setState = ({userid,bought}) => {
    const myDic = {}
    return ({
    type: types.SET_STATE,
    payload: {...myDic,[userid]:bought}
})}