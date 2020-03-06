import * as types from '../types/user'

const user = (state=null,action) => {
    switch (action.type) {
        case types.verified_user_added:
            return action.payload    
        default:
            return state;
    }
}

export default user;

export const getUser = state => state;