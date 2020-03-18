import * as types from '../types/elements'

export const addSong = ({trackid,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song,albumid}) => {
    if(image===undefined){
        image = './default'
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
                song
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
                album
            }
        }
    })
} 

export const updateSong = (index,id,name,album,mediaType,genre,composer,millisecons,bytes,unitePrice) => ({
    type: types.element_updated,
    payload:{
        index,
        element:{
            id,
            name,
            album,
            mediaType,
            genre,
            composer,
            millisecons,
            bytes,
            unitePrice
        }
    }
})

export const updateArtist = (index,id,name) => ({
    type: types.element_updated,
    payload:{
        index,
        element:{
            id,
            name,
        }
    }
})

export const updateAlbum = (index,id,tittle,artist) => ({
    type: types.element_updated,
    payload:{
        index,
        element:{
            id,
            tittle,
            artist
        }
    }
})

export const deleteElement = (index,id) => ({
    type: types.element_deleted,
    payload:{
        index,
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