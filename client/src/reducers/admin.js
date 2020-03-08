import * as types from '../types/admin'
import {combineReducers} from 'redux'

const adminState = (state=true,action)=>{
    switch (action.type) {
        case types.adminState_changed:
            return !state
        default:
            return state
    }
}

const byID = (state={},action) => {
    switch (action.type) {
        case types.user_permissions_updated:
            return {...state,[action.payload.id]:action.payload}
        default:
            return state
    }
}

const order = (state=[],action) => {
    switch (action.type) {
        case types.user_permissions_updated:
            return [...state,action.payload.id]
        default:
            return state
    }
}

const admin = combineReducers({
    adminState,
    byID,
    order
})

export default admin

export const getPermission = (state,id) => state.byID[id]
export const getAllPermissions = state => state.order.map(
    id => getPermission(state,id)
).filter(user => user != null)
export const getAdminState = state => state.adminState; 