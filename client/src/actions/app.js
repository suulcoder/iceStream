import * as types from '../types/app'

export const changeState = (index) => ({
    type: types.appState_Changed,
    payload: index
})

export const addSection = (key,value) => ({
    type: types.object_section_added,
    payload:{
        key,
        value
    }
})

export const setToNull = () => ({
    type: types.object_sections_setted_to_null
})