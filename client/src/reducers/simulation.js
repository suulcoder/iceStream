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

const days = (state=0,action)=>{
    switch (action.type) {
        case types.SET_DAYS:
            return action.payload
        case types.SET_NULL:
            return 0
        default:
            return state
    }
}


const dailySells = (state=0,action)=>{
    switch (action.type) {
        case types.SET_DAILY_SELLS:
            return action.payload
        case types.SET_NULL:
            return 0
        default:
            return state
    }
}


const dailyPlays = (state=0,action)=>{
    switch (action.type) {
        case types.SET_DAILY_PLAYS:
            return action.payload
        case types.SET_NULL:
            return 0
        default:
            return state
    }
}

const validTracks = (state=[],action) => {
    switch (action.type) {
        case types.SET_VALID_TRACKS:
            return action.payload;
        case types.SET_NULL:
            return []
        default:
            return state
    }
}

const validUsers = (state=[],action) => {
    switch (action.type) {
        case types.SET_VALID_USERS:
            return action.payload;
        case types.SET_NULL:
            return []
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
            let currstate = {...state}
            action.payload.forEach(currAction => {
                currstate = {...currstate,[currAction[action.payload.userid]]:[...currAction[action.payload.userid],currAction[action.payload.id]]}
            })
            return state
        default:
            return state
    }
}

const mostPlayed = (state=[],action)=>{
    switch (action.type) {
        case types.SET_NULL:
            return []
        case types.SET_ACTION:
            let currstate = {...state}
            action.payload.forEach(currAction => {
                if(currAction.action==='PLAY'){
                    currstate = [...currstate,currAction.id]
                }
            })
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
            let currstate = {...state}
            action.payload.forEach(currAction => {
                if(currAction.action==='BUY'){
                    currstate = [...currstate,currAction.id]
                }
            })
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
            let currstate = {...state}
            action.payload.forEach(currAction => {
                currstate = [...currstate,currAction.userid]
            })
            return state
        default:
            return state
    }
}

const actions = (state=[],action)=>{
    switch (action.type) {
        case types.SET_NULL:
            return []
        case types.SET_ACTION:
            const dailyActions = action.payload.length;
            const currstate = [...state]
            let counter = 0
            action.payload.forEach(currAction => {
                currstate.push(`${Date(Date.getTime() + ((state.length+1)*86400000)) + ((86400000/dailyActions)*counter)} :  ${currAction.userid} performed action of time '${currAction.action}' on track: ${currAction.id}`)
                counter++;
            })
            return currstate
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
    actions
})


export default simulation

export const getValidTracks = state => state.validTracks;
export const getValidUsers = state => state.validUsers;
export const getDailyPlays = state => state.dailyPlays;
export const getDailySells = state => state.dailySells;
export const getSimulationState = state => state.bought;
export const getTopPlayed = state => top(state.mostPlayed);
export const getTopSelled = state => top(state.mostSelled);
export const getTopInteraction = state => top(state.mostInteractions);
export const getLoader = state => state.loader;
export const getActions = state => state.actions;