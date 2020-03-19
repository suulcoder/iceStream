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
            if(action.payload.control){
                const mysection = state[action.payload.index]
                if(mysection!==undefined){
                    if(!mysection.includes(action.payload.element.id))
                    return {...state,
                        [action.payload.index]:[...mysection,action.payload.element.id]}
                    return state
                }
                return{...state,
                    [action.payload.index]:[action.payload.element.id]
                }
            }
            return state
        case types.section_deleted:
            const currentState = state
            delete currentState[action.payload]
            return currentState       
        default:
            return state
    }
}

const isEdited = (state=null,action) => {
    switch (action.type) {
        case types.element_edited:
            return action.payload.id
        default:
            return state
    }
}

const isSelected = (state=null,action) => {
    switch (action.type) {
        case types.element_selected:
            return action.payload.id
        default:
            return state
    }
}

const elementOrder = (state=[],action) => {
    switch (action.type) {
        case types.search_element_added:
            if(state.includes(action.payload)){
                return state
            }
            return [...state,action.payload]
        case types.search_setted_to_null:
            return []
        case types.element_deleted:
            return state.filter(element=>element!=action.payload)
        default:
            return state
    }
}


const elements = combineReducers({
    order,
    byId,
    isEdited,
    isSelected,
    elementOrder
})

export default elements;

export const getElement = (state, id) => state.byId[id];
export const getSection = (state, index) => state.order[index]
export const getAll = (state) => state.orderSections.map(
    section => getSection(state,section)
).filter(section => section!=null);
export const getSectionIDs = (state) => Object.keys(state.order)
export const getSelected = (state) => (state.isSelected===null)?null: getElement(state,state.isSelected)
export const getSearchedElements = (state) => state.elementOrder