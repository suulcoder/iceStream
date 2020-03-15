import * as types from '../types/elements'

export const addSong = ({playlist,trackid,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song}) => {
    if(image===undefined){
        image = './default'
    }
    return ({
        type: types.element_added,
        payload:{
            index : genre,
            element:{
                id: 'track_'+trackid,
                type:'track',
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

export const addArtist = ({artistid,name,image}) => ({
    type: types.element_added,
    payload:{
        index:name,
        element:{
            type:'artist',
            id:('artist'+String(artistid)),
            name,
            image,
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