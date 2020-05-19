import './styles.css';
import React, { Fragment,useState } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/elemnts'

const Playlist = ({userid,artistid,name,image,artist,onSubmit,canModify,canDelete,onDelete,isEdited,onUpdate,onEdit,element}) => {
    const [artistName,changeName] = useState(name)  
    const [playlist,changePlaylist] = useState('')
    const [track1,changeTrack1] = useState((Object.values(tracks[0])[0]===undefined)?(''):(Object.values(tracks[0])[1]))
    const [track2,changeTrack2] = useState((Object.values(tracks[0])[0]===undefined)?(''):(Object.values(tracks[0])[1]))
    const [track3,changeTrack3] = useState((Object.values(tracks[0])[0]===undefined)?(''):(Object.values(tracks[0])[1]))
    const [track4,changeTrack4] = useState((Object.values(tracks[0])[0]===undefined)?(''):(Object.values(tracks[0])[1]))
    const [track5,changeTrack5] = useState((Object.values(tracks[0])[0]===undefined)?(''):(Object.values(tracks[0])[1]))
    return (
    <Fragment>
        <div className="artist"> 
                <div className="artist_">
                    <img alt='' src={image} className="image"></img>
                    {/* <button className="link" type="submit" onClick={
                        () => onSubmit(artist)}>
                    </button> */}
                    <div className="artistinfo">
                        <div className="artistitle"><strong>PLAYLIST:</strong></div>
                        {
                            (isEdited)?(
                                <Fragment>
                                <div><strong>Name:</strong>
                                    <input
                                    className="input_"
                                    type="text"
                                    placeholder="Name"
                                    value={playlist}
                                    onChange={e => changePlaylist(e.target.value)}
                                    />
                                </div>
                                <div><strong>Tracks:</strong>
                                    <select value={track1} onChange={e=>{
                                    return changeTrack1(e.target.value)}} className="select" id="B" name="track">
                                    {artists.map(artist => (
                                        <option key={Object.values(artist)[0]} value={Object.values(artist)[1]}>{Object.values(artist)[1]}</option>
                                    ))}
                                    </select>
                                    <select value={track2} onChange={e=>{
                                    return changeTrack2(e.target.value)}} className="select" id="B" name="track">
                                    {artists.map(artist => (
                                        <option key={Object.values(artist)[0]} value={Object.values(artist)[1]}>{Object.values(artist)[1]}</option>
                                    ))}
                                    </select>
                                    <select value={track3} onChange={e=>{
                                    return changeTrack3(e.target.value)}} className="select" id="B" name="track">
                                    {artists.map(artist => (
                                        <option key={Object.values(artist)[0]} value={Object.values(artist)[1]}>{Object.values(artist)[1]}</option>
                                    ))}
                                    </select>
                                    <select value={track4} onChange={e=>{
                                    return changeTrack4(e.target.value)}} className="select" id="B" name="track">
                                    {artists.map(artist => (
                                        <option key={Object.values(artist)[0]} value={Object.values(artist)[1]}>{Object.values(artist)[1]}</option>
                                    ))}
                                    </select>
                                    <select value={track5} onChange={e=>{
                                    return changeTrack5(e.target.value)}} className="select" id="B" name="track">
                                    {artists.map(artist => (
                                        <option key={Object.values(artist)[0]} value={Object.values(artist)[1]}>{Object.values(artist)[1]}</option>
                                    ))}
                                    </select>
                                </div>
                                </Fragment>
                            ):(
                                <Fragment>
                                <div><strong>Name:</strong> {name}</div>
                                <div><strong>Name:</strong> {track1}</div>
                                <div><strong>Name:</strong> {track2}</div>
                                <div><strong>Name:</strong> {track3}</div>
                                <div><strong>Name:</strong> {track4}</div>
                                <div><strong>Name:</strong> {track5}</div>
                                </Fragment>
                            )
                        }
                        
                    </div>
                </div>
                <div>
                {
                    (!isEdited)?(
                        <button className="edit" type="submit" onClick={
                            () => onEdit(playlistid)
                        }>
                        </button>
                    ):(
                            <button className="save" type="submit" onClick={
                                () => onUpdate(playlistid,playlist,track1,track2,track3,track4,track5)
                            }>
                            </button>
                        
                    )
                }
                {
                    (canDelete)?(
                        <button className="delete" type="submit" onClick={
                            () => onDelete(playlistid,userid)
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
        artistid:Object.values(selectors.getElement(state,id))[1],
        name:Object.values(selectors.getElement(state,id))[2],
        image:Object.values(selectors.getElement(state,id))[3],
        artist:Object.values(selectors.getElement(state,id))[4],
        canModify:Object.values(selectors.getUser(state))[13],
        canDelete:Object.values(selectors.getUser(state))[14],
        isEdited,
        element:selectors.getElement(state,id),
        userid: selectors.getUser(state).userid
    }),
    dispatch=>({
        onSubmit(artist){
            window.location.href = artist;
        },
        onDelete(id,userid){
            alert("ALL ALBUMS WILL BE DELETED TOO")
            const artistid = id.split('artist')[1]
            const request = new Request('http://localhost:8080/api/actions/delete/before/artist',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({id:artistid,userid})
            })
            fetch(request)
                .then(async(response)=>{
                    response.json()
                    .then(table => {
                        const request1 = new Request('http://localhost:8080/api/actions/delete/artist',{
                            method:'POST',
                            headers: { 'Content-Type':'application/json'},
                            body: JSON.stringify({id:artistid})
                        })
                        fetch(request1)
                            .then(async(response)=>{
                                response.json()
                                .then(table => {
                                    dispatch(actions.deleteElement(id))
                                })
                            })
                    })
                })
        },
        onEdit(id){
            dispatch(actions.editElement(id))
        },
        onUpdate(id,name,element,userid){
            const artistid = id.split('artist')[1]
            const request = new Request('http://localhost:8080/api/actions/update/artist',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({id:artistid,name:name,userid})
            })
            fetch(request)
                .then(async(response)=>{
                    response.json()
                    .then(table => {
                        dispatch(actions.upadateArtist({...element,name}))
                        dispatch(actions.editElement(null))
                        window.location.href = 'http://localhost:3000/'
                    })
                })
        }
    })
)(Artist)