import * as types from '../types/user'

export const setUser = ({userid, username, email, role,canlogin,canaddartist,canaddalbum,canaddtrack,caninactivatesong,canmodifiysong,candeletesong,canmodifiyalbum,candeletealbum,canmodifyartist,candeleteartist}) => ({
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
        caninactivatesong:(caninactivatesong==='TRUE')?true:false,
        canmodifiysong:(canmodifiysong==='TRUE')?true:false,
        candeletesong:(candeletesong==='TRUE')?true:false,
        canmodifiyalbum:(canmodifiyalbum==='TRUE')?true:false,
        candeletealbum:(candeletealbum==='TRUE')?true:false,
        canmodifyartist:(canmodifyartist==='TRUE')?true:false,
        candeleteartist:(candeleteartist==='TRUE')?true:false,
    }
})

export const setUsertoNull = () => ({
    type:types.verified_user_added,
    payload: null
})

export const addBoughtTrack = (id) => ({
    type:types.addBoughtTrack,
    payload: id
})

export const addUser = ({userid,email,role,username,canlogin,canaddartist,canaddalbum,canaddtrack,caninactivatesong,canmodifiysong,candeletesong,canmodifiyalbum,candeletealbum,canmodifyartist,candeleteartist}) =>  ({
    type: types.user_added,
    payload: {
        email,
        role,
        username,
        userid,
        canlogin:(canlogin==='TRUE' || canlogin===true)?true:false,
        canaddartist:(canaddartist==='TRUE' || canaddartist===true)?true:false,
        canaddalbum:(canaddalbum==='TRUE' || canaddalbum===true)?true:false,
        canaddtrack:(canaddtrack==='TRUE' || canaddtrack===true)?true:false,
        caninactivatesong:(caninactivatesong==='TRUE' || caninactivatesong===true)?true:false,
        canmodifiysong:(canmodifiysong==='TRUE' || canmodifiysong===true)?true:false,
        candeletesong:(candeletesong==='TRUE' || candeletesong===true)?true:false,
        canmodifiyalbum:(canmodifiyalbum==='TRUE' || canmodifiyalbum===true)?true:false,
        candeletealbum:(candeletealbum==='TRUE' || candeletealbum===true)?true:false,
        canmodifyartist:(canmodifyartist==='TRUE' || canmodifyartist===true)?true:false,
        candeleteartist:(candeleteartist==='TRUE' || candeleteartist===true)?true:false,
    }
})

export const set_Bought_to_null = () => ({
    type: types.setBoughtToNull
})

export const setEpmty = () => ({
    type:types.set_empty
})

export const addToOrder = ({userid}) => ({
    type:types.added_to_order,
    payload:{
        userid:userid
    }
})