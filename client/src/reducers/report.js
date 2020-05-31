import * as types from '../types/report'
import {combineReducers} from 'redux'

const index = (state = 0, action) => {
    switch (action.type) {
        case types.report_changed_up:
            return (state + 1) % 12
        case types.report_changed_down:
            return (state + 11) % 12
        default:
            return state
    }
}

const info = (state = {}, action) => {
    switch (action.type){
        case types.report_section_added:
            const newState = action.payload.extras === null ? {...state, [action.payload.key]: action.payload.value} : {...state, [action.payload.key]: action.payload.value, [`${action.payload.key}_EXTRAS`]: action.payload.extras}
            return newState;
        case types.report_sections_to_null:
            return {}
        default:
            return state
    }
}

const report = combineReducers({
    index,
    info,
})

export default report

export const getReport = state => state.index;
export const getReportSection = (state, key) => (state.info[key] === undefined) ? ([]) : (state.info[key])