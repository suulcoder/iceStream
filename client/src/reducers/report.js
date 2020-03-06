import * as types from '../types/report'

numberOfReports = 8

const report = (state=0,action) => {
    switch (action.type) {
        case types.report_changed:
            return (state+1)%numberOfReports
        default:
            return state
    }
}

export default report

export const getReport = state => state;