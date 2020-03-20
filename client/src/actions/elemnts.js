import * as types from '../types/elements'

export const addSong = ({trackid,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song,albumid,state}) => {
    if(image===undefined){
        image = '../public/img/default.png'
    }
    return ({
        type: types.element_added,
        payload:{
            control: true,
            index : albumid,
            element:{
                type:'track',
                id: 'track'+trackid,
                name,
                album,
                mediatype,
                genre,
                composer,
                milliseconds,
                bytes,
                unitprice,
                artist,
                image,
                song,
                state:(state==='TRUE')?(true):(false),
                albumid
            }
        }
    })
}

export const addArtist = ({artistid,name,image,artist}) => ({
    type: types.element_added,
    payload:{
        control: false,
        index:name,
        element:{
            type:'artist',
            id:'artist'+artistid,
            name,
            image,
            artist
        }
    }
})

export const addAlbum = ({albumid,title,artist,image,album}) =>{
    if(image===null){
        image='./default.png'
    }
    return ({
        type: types.element_added,
        payload:{
            control: false,
            index:artist,
            element:{
                type:'album',
                id:'album'+albumid,
                title,
                artist,
                image,
                album,
            }
        }
    })
} 

export const updateSong = ({id,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song,albumid,state}) => {
    if(image===undefined){
        image = './default'
    }
    return ({
        type: types.element_updated,
        payload:{
            control: true,
            index : albumid,
            element:{
                type:'track',
                id,
                name,
                album,
                mediatype,
                genre,
                composer,
                milliseconds,
                bytes,
                unitprice,
                artist,
                image,
                song,
                state:(state==='TRUE')?(true):(false)
            }
        }
    })
}

export const upadateArtist = ({id,name,image,artist}) => ({
    type: types.element_updated,
    payload:{
        control: false,
        index:name,
        element:{
            type:'artist',
            id,
            name,
            image,
            artist
        }
    }
})

export const updateAlbum = ({id,title,artist,image,album}) =>{
    if(image===null){
        image='./default.png'
    }
    return ({
        type: types.element_updated,
        payload:{
            control: false,
            index:artist,
            element:{
                type:'album',
                id,
                title,
                artist,
                image,
                album
            }
        }
    })
}

export const deleteElement = (id) => ({
    type: types.element_deleted,
    payload:{
        id
    }
})

export const selectElement = (id) => ({
    type: types.element_selected,
    payload:{
        id
    }
})

export const editElement = (id) => ({
    type: types.element_edited,
    payload:{
        id
    }
})

export const addSearchELement = (type,id) => ({
    type: types.search_element_added,
    payload: type+id
})

export const setSearchtoNull = () => ({
    type:types.search_setted_to_null,
    payload: null
})

export const deleteSection = (id) => ({
    type: types.section_deleted,
    payload: id
})

export const setToNull = () =>({
    type: types.byID_to_null
})