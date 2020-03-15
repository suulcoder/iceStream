import * as types from '../types/elements'

export const addSong = ({trackid,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song}) => ({
    type: types.element_added,
    payload:{
        index : album,
        element:{
            type: 'track',
            id:trackid,
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

export const addArtist = (index,id,name) => ({
    type: types.element_added,
    payload:{
        index,
        element:{
            id:('artist'+String(id)),
            name,
        }
    }
})

export const addAlbum = (index,id,tittle,artist) => ({
    type: types.element_added,
    payload:{
        index,
        element:{
            id:('album'+String(id)),
            tittle,
            artist
        }
    }
})

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

export const selectElement = (index,id) => ({
    type: types.element_selected,
    payload:{
        index,
        id
    }
})

export const editElement = (index,id) => ({
    type: types.element_edited,
    payload:{
        index,
        id
    }
})