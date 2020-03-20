import * as types from '../types/app'
import {combineReducers} from 'redux'

const appState = (state=0,action) => {
    switch (action.type) {
        case types.appState_Changed:
            return action.payload;
        default:
            return state
    }
}

const info = (state={}, action) => {
    switch (action.type){
        case types.object_section_added:
            return {...state,[action.payload.key]:action.payload.value}
        case types.object_sections_setted_to_null:
            return {}
        default:
            return state
    }
}

const app = combineReducers({
    appState,
    info
})


export default app

export const getAppState = state => state.appState;
export const getSection = (state,id) => state.info[id]