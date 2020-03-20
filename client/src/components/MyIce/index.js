import './styles.css';
import React, {Fragment, useState} from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';

const MyIce = ({canAddTrack,canAddArtist,canAddAlbum,canInactivateTrack,canModifyTrack,
    canDeleteTrack,canModifyAlbum,canDeleteAlbum,canModifyArtist,canDeleteArtist,artists,
    mediatypes,genres,albums,
    onSaveTrack,onSaveAlbum,
    onSaveArtist,userid}) => {
    const [trackName,changeTrack] = useState('')
    const [albumName,changeAlbum] = useState((Object.values(albums[0])[0]===undefined)?(''):(Object.values(albums[0])[1]))
    const [album,changeAlbumName] = useState('')
    const [artist,changeArtistName] = useState((Object.values(artists[0])[0]===undefined)?(''):(Object.values(artists[0])[1]))
    const [genreName,changeGenre] = useState((Object.values(genres[0])[0]===undefined)?(''):(Object.values(genres[0])[1]))
    const [mediaTypeName,changeMediaType] = useState((Object.values(mediatypes[0])[0]===undefined)?(''):(Object.values(mediatypes[0])[1]))
    const [composerName,changeComposer] = useState('')
    const [Minutes,changeMinutes] = useState('0')
    const [seconds,changeSeconds] = useState('0')
    const [size,changeSize] = useState('0')
    const [myPrice,changePrice] = useState('0')
    const [name,changeName] = useState('')
    return (
        <div className='myIce'>
            <div className="addMyIce">
                <div className="addMyIce_"><strong>MyIce:</strong>
                <div className="GrayBar"></div>
                <div className="add_title"><strong>NEW ALBUM:</strong></div>
                <div className="album">
                {
                    (canAddAlbum)?(
                        <Fragment>
                        <div className="info">
                            <div><strong>Title:</strong>
                                <input
                                className="input_"
                                type="text"
                                placeholder="Title"
                                value={album}
                                onChange={e => changeAlbumName(e.target.value)}
                                />
                            </div>
                            <div><strong>Artist:</strong>
                                <select value={artist} onChange={e=>{
                                return changeArtistName(e.target.value)}} className="select" id="B" name="artist">
                                {artists.map(artist => (
                                    <option key={Object.values(artist)[0]} value={Object.values(artist)[1]}>{Object.values(artist)[1]}</option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <button className="save" type="submit" onClick={
                            () => onSaveAlbum(album,artist,userid)
                        }>
                        </button>
                        </Fragment>
                    ):(
                        <div><strong>You can add new Albums</strong></div>
                    )
                }
                
                </div>
                </div>
                <div className="GrayBar"></div>
                <div className="add_title"><strong>NEW ARTIST:</strong></div>
                <div className="album"> 
                {
                    (canAddArtist)?(
                        <Fragment>
                        <div><strong>Name:</strong>
                            <input
                            className="input_"
                            type="text"
                            placeholder="Artist Name"
                            value={name}
                            onChange={e => changeName(e.target.value)}
                            />
                        </div>
                        <button className="save" type="submit" onClick={
                            () => onSaveArtist(name,userid)
                        }>
                        </button>
                        </Fragment>
                    ):(
                        <div><strong>You can add new Artists</strong></div>
                    )
                }
                
                </div>
                <div className="GrayBar"></div>
                <div className="add_title"><strong>NEW TRACK:</strong>
                <div className="album">
                {
                    (canAddTrack)?(
                        <Fragment>
                        <div className="track_">
                        <div className="info">
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
                                return changeAlbum(e.target.value)}} className="select" id="C" name="album">
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
                        </div>
                        <div className="info">
                            <div><strong>MediaType:</strong>
                            </div>
                                <select value={mediaTypeName} className="select" onChange={e=>{
                                return changeMediaType(e.target.value)}} id="B" name="artist">
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
                        </div>
                        </div>
                        <button className="save" type="submit" onClick={
                            () => onSaveTrack(trackName,albumName,mediaTypeName,genreName,composerName,(seconds*1000+Minutes*60000),size*1024*1024,myPrice,userid)
                        }>
                        </button>
                        </Fragment>
                    ):(
                        <div><strong>You can add new Tracks</strong></div>
                    )
                }
                </div>
                <div className="GrayBar"></div>
                <div className="GrayBar"></div>
            </div>
            </div>
            <div className="myPermissions" >
                <div className="myPermissions_"><strong>MY PERMISSIONS:</strong></div>
                <div className="category">
                    <div className="title_category">Add Tracks</div>
                    <img alt="" className={(canAddTrack)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Add Ablums</div>
                    <img alt="" className={(canAddAlbum)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Add Aritsts</div>
                    <img alt="" className={(canAddArtist)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Inactivate Tracks</div>
                    <img alt="" className={(canInactivateTrack)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Update Tracks</div>
                    <img alt="" className={(canModifyTrack)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Delete Tracks</div>
                    <img alt="" className={(canDeleteTrack)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Update Albums</div>
                    <img alt="" className={(canModifyAlbum)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Delete Albums</div>
                    <img alt="" className={(canDeleteAlbum)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Update Artist</div>
                    <img alt="" className={(canModifyArtist)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Delete Albums</div>
                    <img alt="" className={(canDeleteArtist)?('isTrue'):('isFalse')} ></img>
                </div>
            </div>
        </div>
    )
}

export default connect(
    state=>({
        canAddArtist:Object.values(selectors.getUser(state))[5],
        canAddAlbum:Object.values(selectors.getUser(state))[6],
        canAddTrack:Object.values(selectors.getUser(state))[7],
        canInactivateTrack:Object.values(selectors.getUser(state))[8],
        canModifyTrack:Object.values(selectors.getUser(state))[9],
        canDeleteTrack:Object.values(selectors.getUser(state))[10],
        canModifyAlbum:Object.values(selectors.getUser(state))[11],
        canDeleteAlbum:Object.values(selectors.getUser(state))[12],
        canModifyArtist:Object.values(selectors.getUser(state))[13],
        canDeleteArtist:Object.values(selectors.getUser(state))[14],
        artists: selectors.getInfo(state,'artist'),
        genres: selectors.getInfo(state,'genre'),
        albums: selectors.getInfo(state,'album'),
        mediatypes: selectors.getInfo(state,'mediatype'),
        userid: Object.values(selectors.getUser(state))[3]
    }),
    dispatch => ({
        onSaveAlbum(album,artist,userid){
            fetch('http://localhost:8080/api/newalbumid',{method:'GET'})
            .then(response => response.json())
            .then(data => {
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
                            const request1 = new Request('http://localhost:8080/api/newAlbum',{
                                method:'POST',
                                headers: { 'Content-Type':'application/json'},
                                body: JSON.stringify({id:Object.values(data[0])[0]+1,album:album,artist:artistid})
                            })
                            fetch(request1)
                            .then(async(response)=>{
                                const request2 = new Request('http://localhost:8080/api/useralbum',{
                                method:'POST',
                                headers: { 'Content-Type':'application/json'},
                                body: JSON.stringify({userid:userid,id:Object.values(data[0])[0]+1,inDate:new Date()})
                                })
                                fetch(request2)
                                .then(async(response)=>{
                                    alert("ALBUM ADDED SUCCESSFULLY")
                                    window.location.href = 'http://localhost:3000/'
                                })
                            })
                        })
                })
            })
        },
        onSaveArtist(value,userid){
            fetch('http://localhost:8080/api/newartistid',{method:'GET'})
            .then(response => response.json())
            .then(data => {
                const request = new Request('http://localhost:8080/api/newArtist',{
                    method:'POST',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify({id:Object.values(data[0])[0]+1,name:value})
                })
                fetch(request)
                .then(async(response)=>{
                    const request1 = new Request('http://localhost:8080/api/userartist',{
                    method:'POST',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify({userid:userid,id:Object.values(data[0])[0]+1,inDate:new Date()})
                })
                fetch(request1)
                .then(async(response)=>{
                    alert("ARTIST ADDED SUCCESSFULLY")
                    window.location.href = 'http://localhost:3000/'
                })
                })
        
            })
        },
        onSaveTrack(name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,userid){
            fetch('http://localhost:8080/api/newtrackid',{method:'GET'})
            .then(response => response.json())
            .then(data => {
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
                                                        const request4 = new Request('http://localhost:8080/api/newTrack',{
                                                            method:'POST',
                                                            headers: { 'Content-Type':'application/json'},
                                                            body: JSON.stringify({id:Object.values(data[0])[0]+1,name:name,albumid:albumid,mediatypeid:mediatypeid,genreid:genreid,composer:composer,milliseconds:milliseconds,bytes:bytes,unitprice:unitprice})
                                                        })
                                                        fetch(request4)
                                                        .then(async(response)=>{
                                                            const request5 = new Request('http://localhost:8080/api/usertrack',{
                                                                method:'POST',
                                                                headers: { 'Content-Type':'application/json'},
                                                                body: JSON.stringify({userid:userid, id:Object.values(data[0])[0]+1,inDate:new Date()})
                                                            })
                                                            fetch(request5)
                                                            .then(async(response)=>{
                                                                alert("TRACK ADDED SUCCESSFULLY")
                                                                window.location.href = 'http://localhost:3000/'
                                                            })
                                                        })
                                                    })
                                                })
                                        })
                                    })
                            })
                        })
                })
        } 
}))(MyIce)