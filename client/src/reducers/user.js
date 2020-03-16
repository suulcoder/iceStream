import * as types from '../types/user'
import {combineReducers} from 'redux'


const currentuser = (state=null,action) => {
    switch (action.type) {
        case types.verified_user_added:
            return action.payload    
        default:
            return state;
    }
}

const users = (state={},action) => {
    switch (action.type) {
        case types.user_added:
            return {...state,[action.payload.userid]:action.payload}
        default:
            return state
    }
}

const order = (state=[],action) => {
    switch (action.type) {
        case types.user_added:
            if(state.includes(action.payload.userid)){
                return state
            }
            return [...state,action.payload.userid]
        default:
            return state
    }
}

const user = combineReducers({
    currentuser,
    users,
    order
})

export default user;

export const getUser = state => state.currentuser;
export const getUsers = (state,id) => state.users[id]
export const getAllUsers = (state) => state.order