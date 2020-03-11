import {combineReducers} from 'redux'
import * as types from '../types/elements'

const byId = (state={},action) => {
    switch (action.type) {
        case types.element_added:
            return {...state,[action.payload.element.id]:action.payload.element}
        case types.element_deleted:
            const currentState = state;
            delete currentState[action.payload.id]
            return currentState
        case types.element_updated:
            return {
                ...state,
                [action.payload.element.id]: {
                  ...state[action.payload.element.id],
                  ...action.payload.element,
                },
              };
        default:
            return state
    }
}

const order = (state={},action) => {
    switch (action.type) {
        case types.element_added:
            return {...state,
                [action.payload.index]:action.payload.element.id}
        case types.element_deleted:
            const section = state[action.payload.index].filter(id => id!==action.payload.id)
            if(section.length()===0){
                delete state[action.payload.index]
            }
            return {...state,[action.payload.index]:section}
        default:
            return state
    }
}

const isEdited = (state=[null,null],action) => {
    switch (action.type) {
        case types.element_edited:
            return [action.payload.index, action.payload.id]
        default:
            return state
    }
}

const isSelected = (state=[null,null],action) => {
    switch (action.type) {
        case types.element_selected:
            return [action.payload.index, action.payload.id]
        default:
            return state
    }
}

const elements = combineReducers({
    order,
    byId,
    isEdited,
    isSelected,
})

export default elements;

export const getElement = (state, id) => state.byId[id];
export const getSection = (state, index) => state.order[index].map(
    id => getElement(state, id),
  ).filter(agent => agent != null);
export const getAll = (state) => state.orderSections.map(
    section => getSection(state,section)
).filter(section => section!=null);