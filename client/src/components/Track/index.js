import './styles.css';
import React, { Fragment, useState } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/elemnts'

const Track = ({id,name,album,mediatype,genre,select,composer,milliseconds,bytes,unitprice,artist,image,song,state,canDelete,canModify,canInactivate,inactivate,reduxState,onDelete,isEdited,onEdit,element,onUpdate,artists,genres,mediatypes,albums}) => {
  const [trackName,changeTrack] = useState(name)
  const [albumName,changeAlbum] = useState(album)
  const [genreName,changeGenre] = useState(genre)
  const [mediaTypeName,changeMediaType] = useState(mediatype)
  const [composerName,changeComposer] = useState(composer)
  const [Minutes,changeMinutes] = useState(Math.floor(milliseconds / 60000))
  const [seconds,changeSeconds] = useState(((milliseconds % 60000) / 1000).toFixed(0))
  const [size,changeSize] = useState(((bytes/1024)/1024).toFixed(2))
  const [myPrice,changePrice] = useState(unitprice)
  return(
   <Fragment>
        <div className="song_"> 
                <div className="track_">
                    <img alt='' src={image} className="image"></img>
                    <div className="state">
                        <button className="play_" type="submit" onClick={
                            () => select(id)}>
                        </button>      
                        <div className="state_" ><strong>STATE: </strong>{(state)?('ACTIVE'):('INACTIVE')}</div>
                    </div>
                    <div className="track_info">
                        {
                            (isEdited)?(
                                <Fragment>
                                    <div><strong>Name:</strong>
                                        <input
                                        className="input_"
                                        type="text"
                                        placeholder="Track"
                                        value={trackName}
                                        onChange={e => changeTrack(e.target.value)}
                                        />
                                    </div>
                                    <div><strong>Album:</strong>
                                        <select value={albumName}  onChange={e=>{
                                        return changeAlbum(e.target.value)}} className="select" id="B" name="artist">
                                        {albums.map(element => (
                                            <option key={Object.values(element)[0]} value={Object.values(element)[1]}>{Object.values(element)[1]}</option>
                                        ))}
                                        </select>
                                    </div>
                                    <div><strong>Composer: </strong>
                                        <input
                                        className="input_"
                                        type="text"
                                        placeholder="Composer"
                                        value={composerName}
                                        onChange={e => changeComposer(e.target.value)}
                                        />
                                    </div>
                                    <div><strong>Genre:</strong>
                                        <select value={genreName}  onChange={e=>{
                                        return changeGenre(e.target.value)}} className="select" id="B" name="artist">
                                        {genres.map(element => (
                                            <option key={Object.values(element)[0]} value={Object.values(element)[1]}>{Object.values(element)[1]}</option>
                                        ))}
                                        </select>
                                    </div>
                                </Fragment>
                            ):(
                                <Fragment>
                                    <div><strong>Name: </strong>{name}</div>
                                    <div><strong>Album: </strong>{album}</div>
                                    <div><strong>Artist: </strong>{artist}</div>
                                    <div><strong>Genre: </strong>{genre}</div>
                                </Fragment>
                            )
                        }
                    </div>
                    <div className="track_info">
                        {
                            (isEdited)?(
                                <Fragment>
                                    <div><strong>MediaType:</strong>
                                    </div>
                                        <select value={mediaTypeName} onChange={e=>{
                                        return changeMediaType(e.target.value)}} className="select" id="B" name="artist">
                                        {mediatypes.map(element => (
                                            <option key={Object.values(element)[0]} value={Object.values(element)[1]}>{Object.values(element)[1]}</option>
                                        ))}
                                        </select> 
                                    <div><strong>Duration: </strong>
                                        <div className="duration_">
                                            <input
                                            className="duration"
                                            type="number"
                                            min="0"
                                            max="59"
                                            placeholder="Duration"
                                            value={Minutes}
                                            onChange={e => changeMinutes(e.target.value)}
                                            />
                                            <div> {' : '} </div>
                                            <input
                                            className="duration"
                                            type="number"
                                            min="0"
                                            max="59"
                                            placeholder="Duration"
                                            value={seconds}
                                            onChange={e => changeSeconds(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div><strong>Price: </strong> $
                                        <input
                                        className="duration"
                                        type="number"
                                        min="0"
                                        max="2000"
                                        step="0.01"
                                        placeholder="Duration"
                                        value={myPrice}
                                        onChange={e => changePrice(e.target.value)}
                                        />
                                    </div>
                                    <div><strong>Size: </strong> Mb
                                        <input
                                        className="duration"
                                        type="number"
                                        min="0"
                                        max="1024"
                                        step="0.01"
                                        placeholder="Duration"
                                        value={size}
                                        onChange={e => changeSize(e.target.value)}
                                        />
                                    </div>                                                            
                                </Fragment>
                            ):(
                                <Fragment>
                                    <div><strong>Composer: </strong>{composer}</div>
                                    <div><strong>MediaType: </strong>{mediatype}</div>
                                    <div><strong>Duration: </strong>{Math.floor(milliseconds / 60000) + ":" + ((milliseconds % 60000) / 1000).toFixed(0)}</div>
                                    <div><strong>Price: </strong>${unitprice}</div>
                                    <div><strong>Size: </strong>{((bytes/1024)/1024).toFixed(2)}Mb</div>
                                </Fragment>
                            )
                        }
                    </div>
                </div>
                <div className="options">
                    {
                        (canInactivate)?(
                            <button className="inactivate" type="submit" onClick={
                                () => inactivate(id,state,reduxState)
                            }>
                            </button>
                        ):(
                            <div/>
                        )
                    }
                    {
                        (canModify && !isEdited)?(
                            <button className="edit" type="submit" onClick={
                                () => onEdit(id)
                            }>
                            </button>
                        ):(
                            (canModify)?(
                                <button className="save" type="submit" onClick={
                                    () => onUpdate(id,trackName,albumName,mediaTypeName,genreName,composerName,(seconds*1000+Minutes*60000),size*1024*1024,myPrice,artist,image,song,state)
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
                                () => onDelete(id)
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
        type:selectors.getElement(state,id).type,
        id:selectors.getElement(state,id).id,
        name:selectors.getElement(state,id).name,
        album:selectors.getElement(state,id).album,
        mediatype: selectors.getElement(state,id).mediatype,
        genre: selectors.getElement(state,id).genre,
        composer: selectors.getElement(state,id).composer,
        milliseconds: selectors.getElement(state,id).milliseconds,
        bytes: selectors.getElement(state,id).bytes,
        unitprice: selectors.getElement(state,id).unitprice,
        artist: selectors.getElement(state,id).artist,
        image: selectors.getElement(state,id).image,
        song: selectors.getElement(state,id).song,
        state: selectors.getElement(state,id).state,
        albumid: selectors.getElement(state,id).albumid,
        canInactivate:selectors.getUser(state).canInactivate,
        canModify:selectors.getUser(state).canModify,
        canDelete:selectors.getUser(state).canDelete,
        reduxState:state,
        isEdited,
        element:selectors.getElement(state,id),
        artists: selectors.getInfo(state,'artist'),
        genres: selectors.getInfo(state,'genre'),
        albums: selectors.getInfo(state,'album'),
        mediatypes: selectors.getInfo(state,'mediatype')
    }),
    dispatch=>({
        select(id){
            dispatch(actions.selectElement(id))
        },
        inactivate(id,value,reduxState){
            const trackid = id.split('track')[1]
            const state = (value)?('FALSE'):('TRUE')
            const request = new Request('http://localhost:8080/api/actions/inactivate',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({id:trackid,value:state})
            })
            fetch(request)
                .then(async(response)=>{
                    response.json()
                    .then(table => {
                        dispatch(actions.updateSong({...selectors.getElement(reduxState,id),state}))
                    })
                })
        },
        onDelete(id){
            const trackid = id.split('track')[1]
            const request = new Request('http://localhost:8080/api/actions/delete/track',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({id:trackid})
            })
            fetch(request)
                .then(async(response)=>{
                    response.json()
                    .then(table => {
                        dispatch(actions.deleteElement(id))
                    })
                })
        },
        onEdit(id){
            dispatch(actions.editElement(id))
        },
        onUpdate(trackid,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song,state){
            const id = trackid.split('track')[1]
            const request1 = new Request('http://localhost:8080/api/actions/update/getAlbumID',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({id:album})
            })
            fetch(request1)
                .then(async(response)=>{
                    response.json()
                    .then(table => {
                        const albumid = Object.values(table.rows[0])[0]
                        const request2 = new Request('http://localhost:8080/api/actions/update/medieaID',{
                            method:'POST',
                            headers: { 'Content-Type':'application/json'},
                            body: JSON.stringify({id:mediatype})
                        })
                        fetch(request2)
                            .then(async(response)=>{
                                response.json()
                                .then(table => {
                                    const mediatypeid = Object.values(table.rows[0])[0]
                                    const request3 = new Request('http://localhost:8080/api/actions/update/genereID',{
                                        method:'POST',
                                        headers: { 'Content-Type':'application/json'},
                                        body: JSON.stringify({id:genre})
                                    })
                                    fetch(request3)
                                        .then(async(response)=>{
                                            response.json()
                                            .then(table => {
                                                const genreid = Object.values(table.rows[0])[0]
                                                const request4 = new Request('http://localhost:8080/api/actions/update/track',{
                                                    method:'POST',
                                                    headers: { 'Content-Type':'application/json'},
                                                    body: JSON.stringify({id: parseInt(id),name:name,albumid:albumid,mediatypeid:mediatypeid,genreid:genreid,composer:composer,milliseconds:milliseconds,bytes:bytes,unitprice:unitprice})
                                                })
                                                fetch(request4)
                                                    .then(async(response)=>{
                                                            dispatch(actions.updateSong({id:trackid,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song,albumid,state}))
                                                            dispatch(actions.editElement(null))
                                                        
                                                    })
                                            })
                                        })
                                })
                            })
                    })
                })
        }
    })
)(Track)
