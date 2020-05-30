import * as types from '../types/simulation'
import {combineReducers} from 'redux'
import top from '../Utilities/array'

const loader = (state=false,action)=>{
    switch (action.type) {
        case types.IS_LOADDING:
            return action.payload
        case types.SET_NULL:
            return false
        default:
            return state
    }
}

const done = (state=false,action)=>{
    switch (action.type) {
        case types.SET_DONE:
            return action.payload
        default:
            return state
    }
}

const days = (state=0,action)=>{
    switch (action.type) {
        case types.SET_DAYS:
            return action.payload
        case types.SET_ACTION:
            return state-1
        case types.SET_NULL:
            return 1
        default:
            return state
    }
}


const dailySells = (state=1,action)=>{
    switch (action.type) {
        case types.SET_DAILY_SELLS:
            return action.payload
        case types.SET_NULL:
            return 1
        default:
            return state
    }
}


const dailyPlays = (state=1,action)=>{
    switch (action.type) {
        case types.SET_DAILY_PLAYS:
            return action.payload
        case types.SET_NULL:
            return 1
        default:
            return state
    }
}

const validTracks = (state=[],action) => {
    switch (action.type) {
        case types.SET_VALID_TRACKS:
            return action.payload;
        default:
            return state
    }
}

const validUsers = (state=[],action) => {
    switch (action.type) {
        case types.SET_VALID_USERS:
            return action.payload;
        default:
            return state
    }
}

const bought = (state={},action) => {
    switch (action.type) {
        case types.SET_STATE:
            return {...state,...action.payload};
        case types.SET_NULL:
            return {}
        case types.SET_ACTION:
                return {...state,[action.payload.userid]:[...state[action.payload.userid],action.payload.id]}   
        default:
            return state
    }
}

const mostPlayed = (state=[],action)=>{
    switch (action.type) {
        case types.SET_NULL:
            return []
        case types.SET_ACTION:
            if(action.payload.action==='PLAY'){
                return [...state,action.payload.id]
            }
            return state
        default:
            return state
    }
}

const mostSelled = (state=[],action)=>{
    switch (action.type) {
        case types.SET_NULL:
            return []
        case types.SET_ACTION:
            if(action.payload.action==='BUY'){
                return [...state,action.payload.id]
            }
            return state
        default:
            return state
    }
}

const mostInteractions = (state=[],action)=>{
    switch (action.type) {
        case types.SET_NULL:
            return []
        case types.SET_ACTION:
            return [...state,action.payload.userid]
        default:
            return state
    }
}

const actions = (state=[],action)=>{
    switch (action.type) {
        case types.SET_NULL:
            return []
        case types.SET_ACTION:
            return  [...state,`@${action.payload.user} performed action of time '${action.payload.action}' on track: ${action.payload.track}`]
        default:
            return state
    }
}

const simulation = combineReducers({
    bought,
    validUsers,
    validTracks,
    loader,
    days,
    dailyPlays,
    dailySells,
    mostInteractions,
    mostPlayed,
    mostSelled,
    actions,
    done
})


export default simulation

export const getValidTracks = state => state.validTracks;
export const getValidUsers = state => state.validUsers;
export const getSimUser = (state, id) => state.validUsers[id]
export const getDailyPlays = state => state.dailyPlays;
export const getDailySells = state => state.dailySells;
export const getSimulationState = state => state.bought;
export const getTopPlayed = state => top(state.mostPlayed);
export const getTopSelled = state => top(state.mostSelled);
export const getTopInteraction = state => {
    const most = state.mostInteractions
    return state.validUsers.filter(tupl => tupl[0]===most)[0]};
export const getLoader = state => state.loader;
export const getActions = state => state.actions.reverse();
export const getDays = state => state.days;
export const getDone = state => state.done;