import * as types from '../types/report'
import {combineReducers} from 'redux'

const index = (state=0,action) => {
    switch (action.type) {
        case types.report_changed_up:
            return (state+1)%8
        case types.report_changed_down:
            return (state+7)%8
        default:
            return state
    }
}

const info = (state={}, action) => {
    switch (action.type){
        case types.report_section_added:
            return {...state,[action.payload.key]:action.payload.value}
        default:
            return state
    }
}

const report = combineReducers({
    index,
    info
})

export default report

export const getReport = state => state.index;
export const getReportSection = (state,key) => state.info[key]