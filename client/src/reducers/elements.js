import {combineReducers} from 'redux'
import * as types from '../types/elements'

const order = (state=[],action) => {
    switch (action.type) {
        case types.element_added:
            return [...state,action.payload.id]
        case types.element_deleted:
            return [...state.slice(0,action.payload.index),...state.slice(action.payload.index)]
        default:
            return state
    }
}

const byId = (state={},action) => {
    switch (action.type) {
        case types.element_added:
            return {...state,[action.payload.id]:action.payload}
        default:
            return state
    }
}

const elements = combineReducers({
    order,
    byId
})

export default elements;