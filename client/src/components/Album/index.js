import './styles.css';
import React, { Fragment, useState } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/elemnts'

const Album = ({albumid,title,artist,image,album,onSubmit,canModify,canDelete,onDelete,onUpdate,isEdited,element,artists,onEdit}) => {
    const [albumName,changeAlbum] = useState(title)
    const [artistName,changeArtist] = useState(artist)
    return (
    <Fragment>
        <div className="album"> 
                <div className="album_">
                    <img alt='' src={image} className="image"></img>
                    {/* <button className="link" type="submit" onClick={
                        () => onSubmit(album)}>
                    </button> */}
                    <div className="albuminfo">
                        <div className="albumtitle"><strong>ALBUM:</strong></div>
                        {
                            (isEdited)?(
                                <Fragment>
                                    <div><strong>Title:</strong>
                                        <input
                                        className="input_"
                                        type="text"
                                        placeholder="Title"
                                        value={albumName}
                                        onChange={e => changeAlbum(e.target.value)}
                                        />
                                    </div>
                                    <div><strong>Artist:</strong>
                                        <select value={artistName} onChange={e=>{
                                        return changeArtist(e.target.value)}} className="select" id="B" name="artist">
                                        {artists.map(artist => (
                                            <option key={Object.values(artist)[0]} value={Object.values(artist)[1]}>{Object.values(artist)[1]}</option>
                                        ))}
                                        </select>
                                    </div>
                                </Fragment>
                            ):(
                                <Fragment>
                                    <div><strong>Title: </strong> {title}</div>
                                    <div><strong>Artist: </strong> {artist}</div>
                                </Fragment>
                            )
                        }
                    </div>
                </div>
                <div>
                    {
                        (canModify && !isEdited)?(
                            <button className="edit" type="submit" onClick={
                                () => onEdit(albumid)
                            }>
                            </button>
                        ):(
                            (canModify)?(
                                <button className="save" type="submit" onClick={
                                    () => onUpdate(albumid,albumName,artistName,element)
                                }>
                                </button>
                            ):(
                                <Fragment></Fragment>
                            )
                            
                        )
                    }
                    {
                        (canDelete)?(
                            <button className="delete" type="submit" onClick={
                                () => onDelete(albumid)
                            }>
                            </button>
                        ):(
                            <div/>
                        )
                    }
                    
                </div>                
        </div>
    </Fragment>
)}

export default connect(
    (state, {id,isEdited})=>({
        albumid:Object.values(selectors.getElement(state,id))[1],
        title:Object.values(selectors.getElement(state,id))[2],
        artist:Object.values(selectors.getElement(state,id))[3],
        image:Object.values(selectors.getElement(state,id))[4],
        album:Object.values(selectors.getElement(state,id))[5],
        canModify:Object.values(selectors.getUser(state))[11],
        canDelete:Object.values(selectors.getUser(state))[12],
        isEdited,
        element:selectors.getElement(state,id),
        artists: selectors.getInfo(state,'artist')
    }),
    dispatch=>({
        onSubmit(album){
            window.location.href = album;
        },
        onDelete(id){
            alert("ALL TRACKS WILL BE DELETED TOO")
            const albumid = id.split('album')[1]
            const request = new Request('http://localhost:8080/api/actions/delete/album',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({id:albumid})
            })
            fetch(request)
                .then(async(response)=>{
                    response.json()
                    .then(table => {
                        dispatch(actions.deleteElement(id))
                        dispatch(actions.deleteSection(albumid))
                    })
                })
        },
        onEdit(id){
            dispatch(actions.editElement(id))
        },
        onUpdate(id,title,artist,element){
            const albumid = id.split('album')[1]
            const request = new Request('http://localhost:8080/api/actions/update/getArtistID',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({artist:artist})
            })
            fetch(request)
                .then(async(response)=>{
                    response.json()
                    .then(table => {
                        const artistid = Object.values(table.rows[0])[0]
                        const request = new Request('http://localhost:8080/api/actions/update/album',{
                            method:'POST',
                            headers: { 'Content-Type':'application/json'},
                            body: JSON.stringify({id:albumid,name:title,artistid:artistid})
                        })
                        fetch(request)
                            .then(async(response)=>{
                                response.json()
                                .then(table => {
                                    dispatch(actions.updateAlbum({...element,title,artist}))
                                    dispatch(actions.editElement(null))
                                })
                            })
                    })
                })
        }
    })
)(Album)