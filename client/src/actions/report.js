import * as types from '../types/report'

const changeReport = () => ({
    type: types.report_changed
})

export const changeReportDown = () => ({
    type: types.report_changed_down
})

export default changeReport