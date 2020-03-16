import * as types from '../types/user'

export const setUser = ({userid, username, email, role,canlogin,canaddartist,canaddalbum,canaddtrack,caninactivate,canmodify,candelete}) => ({
    type: types.verified_user_added,
    payload: {
        email,
        role,
        username,
        userid,
        canlogin:(canlogin==='TRUE')?true:false,
        canaddartist:(canaddartist==='TRUE')?true:false,
        canaddalbum:(canaddalbum==='TRUE')?true:false,
        canaddtrack:(canaddtrack==='TRUE')?true:false,
        caninactivate,
        canmodify,
        candelete
    }
})

export const setUsertoNull = () => ({
    type:types.verified_user_added,
    payload: null
})

export const addUser = ({userid, username, email, role,canlogin,canaddartist,canaddalbum,canaddtrack}) => ({
    type: types.user_added,
    payload: {
        email,
        role,
        username,
        userid,
        canlogin:(canlogin==='TRUE')?true:false,
        canaddartist:(canaddartist==='TRUE')?true:false,
        canaddalbum:(canaddalbum==='TRUE')?true:false,
        canaddtrack:(canaddtrack==='TRUE')?true:false
    }
})