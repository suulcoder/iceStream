import * as types from '../types/report'


const report = (state=0,action) => {
    switch (action.type) {
        case types.report_changed_up:
            return (state+1)%8
        case types.report_changed_down:
            return (state+7)%8
        default:
            return state
    }
}

export default report

export const getReport = state => state;