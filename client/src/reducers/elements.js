import {combineReducers} from 'redux'
import * as types from '../types/elements'

const order = (state=[],action) => {
    switch (action.type) {
        case types.element_added:
            return [...state,action.payload.id]
        case types.element_deleted:
            return [...state.slice(0,action.payload),...state.slice(action.payload)]
        default:
            return state
    }
}

const byId = (state={},action) => {
    switch (action.type) {
        case types.element_added:
            return {...state,[action.payload.id]:action.payload}
        case types.element_deleted:
            const currentState = state;
            delete currentState[action.payload]
            return currentState
        default:
            return state
    }
}

const isEdited = (state=null,action) => {
    switch (action.type) {
        case types.element_edited:
            return action.payload
        default:
            return state
    }
}

const isSelected = (state=null,action) => {
    switch (action.type) {
        case types.element_selected:
            return action.payload
        default:
            return state
    }
}

const elements = combineReducers({
    order,
    byId,
    isEdited,
    isSelected
})

export default elements;