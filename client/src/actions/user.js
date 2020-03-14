import * as types from '../types/user'

export const setUser = ({userid, username, email, password, role}) => ({
    type: types.verified_user_added,
    payload: {
        email,
        role,
        username,
        userid
    }
})

export const setUsertoNull = () => ({
    type:types.verified_user_added,
    payload: null
})