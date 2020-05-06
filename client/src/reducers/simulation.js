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
            return {...state,[action.payload.userid]:action.payload.bought};
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

const mustPlayed = (state=[],action)=>{
    switch (action.type) {
        case types.SET_NULL:
            return []
        case types.SET_ACTION:
            let currstate = {...state}
            action.payload.forEach(currAction => {
                if(action.action==='PLAY'){
                    currstate = [...currstate,currAction[action.payload.id]]
                }
            })
            return state
        default:
            return state
    }
}

const mustSelled = (state=[],action)=>{
    switch (action.type) {
        case types.SET_NULL:
            return []
        case types.SET_ACTION:
            let currstate = {...state}
            action.payload.forEach(currAction => {
                if(action.action==='BUY'){
                    currstate = [...currstate,currAction[action.payload.id]]
                }
            })
            return state
        default:
            return state
    }
}

const mustInteractions = (state=[],action)=>{
    switch (action.type) {
        case types.SET_NULL:
            return []
        case types.SET_ACTION:
            let currstate = {...state}
            action.payload.forEach(currAction => {
                currstate = [...currstate,currAction[action.payload.userid]]
            })
            return state
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
    mustInteractions,
    mustPlayed,
    mustSelled
})


export default simulation

export const getValidTracks = state => state.validTracks;
export const getValidUsers = state => state.validUsers;
export const getDailyPlays = state => state.dailyPlays;
export const getDailySells = state => state.dailySells;
export const getSimulationState = state => state.bought;
export const getTopPlayed = state => top(state.mustPlayed);
export const getTopSelled = state => top(state.mustSelled);
export const getTopInteraction = state => top(state.mustInteractions);