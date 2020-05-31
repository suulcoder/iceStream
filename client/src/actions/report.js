import * as types from '../types/report'

export const changeReport = () => ({
    type: types.report_changed_up
})

export const changeReportDown = () => ({
    type: types.report_changed_down
})

export const addReportSection = (key, value, extras = null) => ({
    type: types.report_section_added,
    payload:{
        key,
        value,
        extras
    }
})

export const setToNull = () => ({
    type: types.report_sections_to_null
})