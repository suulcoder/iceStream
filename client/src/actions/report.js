import * as types from '../types/report'

export const changeReport = () => ({
    type: types.report_changed_up
})

export const changeReportDown = () => ({
    type: types.report_changed_down
})
