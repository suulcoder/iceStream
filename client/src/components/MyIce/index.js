import './styles.css';
import React, {Fragment, useState} from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Track from '../Track';
import Album from '../Album';
import Artist from '../Artist';


const MyIce = ({canAddTrack,canAddArtist,canAddAlbum,canInactivateTrack,canModifyTrack, canDeleteTrack,canModifyAlbum,canDeleteAlbum,canModifyArtist,canDeleteArtist,
artists,mediatypes,genres,albums,onSaveTrack,onSaveAlbum,onSaveArtist}) => {
    const [trackName,changeTrack] = useState('')
    const [albumName,changeAlbum] = useState('')
    const [artistName,changeArtist] = useState('')
    const [album,changeAlbumName] = useState('')
    const [artist,changeArtistName] = useState('')
    const [genreName,changeGenre] = useState('')
    const [mediaTypeName,changeMediaType] = useState('')
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
                                <select value={artist} className="select_" onChange={e=>{
                                return changeArtistName(e.target.value)}} className="select" id="B" name="artist">
                                {artists.map(artist => (
                                    <option key={Object.values(artist)[0]} value={Object.values(artist)[1]}>{Object.values(artist)[1]}</option>
                                ))}
                                </select>
                            </div>
                        </div>
                    ):(
                        <div><strong>You can add new Albums</strong></div>
                    )
                }
                <button className="save" type="submit" onClick={
                    () => onSaveAlbum(album,artist)
                }>
                </button>
                </div>
                </div>
                <div className="GrayBar"></div>
                <div className="add_title"><strong>NEW ARTIST:</strong></div>
                <div className="album"> 
                {
                    (canAddArtist)?(
                        <div><strong>Name:</strong>
                            <input
                            className="input_"
                            type="text"
                            placeholder="Artist Name"
                            value={name}
                            onChange={e => changeName(e.target.value)}
                            />
                        </div>
                    ):(
                        <div><strong>You can add new Artists</strong></div>
                    )
                }
                <button className="save" type="submit" onClick={
                    () => onSaveAlbum(name)
                }>
                </button>
                </div>
                <div className="GrayBar"></div>
                <div className="add_title"><strong>NEW TRACK:</strong>
                <div className="album">
                {
                    (canAddTrack)?(
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
                                <select value={albumName} className="select_" onChange={e=>{
                                return changeAlbum(e.target.value)}} className="select" id="B" name="artist">
                                {albums.map(element => (
                                    <option key={Object.values(element)[0]} value={Object.values(element)[1]}>{Object.values(element)[1]}</option>
                                ))}
                                </select>
                            </div>
                            <div><strong>Artist:</strong>
                                <select value={artistName} className="select_" onChange={e=>{
                                return changeArtist(e.target.value)}} className="select" id="B" name="artist">
                                {artists.map(element => (
                                    <option key={Object.values(element)[0]} value={Object.values(element)[1]}>{Object.values(element)[1]}</option>
                                ))}
                                </select>
                            </div>
                            <div><strong>Genre:</strong>
                                <select value={genreName} className="select_" onChange={e=>{
                                return changeGenre(e.target.value)}} className="select" id="B" name="artist">
                                {genres.map(element => (
                                    <option key={Object.values(element)[0]} value={Object.values(element)[1]}>{Object.values(element)[1]}</option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <div className="info">
                            <div><strong>Composer: </strong>
                                <input
                                className="input_"
                                type="text"
                                placeholder="Composer"
                                value={composerName}
                                onChange={e => changeComposer(e.target.value)}
                                />
                            </div>
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
                    ):(
                        <div><strong>You can add new Tracks</strong></div>
                    )
                }
                <button className="save" type="submit" onClick={
                    () => onSaveTrack(trackName,albumName,mediaTypeName,genreName,composerName,(seconds*1000+Minutes*60000),size*1024*1024,myPrice,artistName)
                }>
                </button>
                </div>
                <div className="GrayBar"></div>
                <div className="GrayBar"></div>
            </div>
            </div>
            <div className="myPermissions" >
                <div className="myPermissions_"><strong>MY PERMISSIONS:</strong></div>
                <div className="category">
                    <div className="title_category">Add Tracks</div>
                    <img className={(canAddTrack)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Add Ablums</div>
                    <img className={(canAddAlbum)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Add Aritsts</div>
                    <img className={(canAddArtist)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Inactivate Tracks</div>
                    <img className={(canInactivateTrack)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Update Tracks</div>
                    <img className={(canModifyTrack)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Delete Tracks</div>
                    <img className={(canDeleteTrack)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Update Albums</div>
                    <img className={(canModifyAlbum)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Delete Albums</div>
                    <img className={(canDeleteAlbum)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Update Artist</div>
                    <img className={(canModifyArtist)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Delete Albums</div>
                    <img className={(canDeleteArtist)?('isTrue'):('isFalse')} ></img>
                </div>
            </div>
        </div>
    )
}

export default connect(
    state=>({
        canAddTrack:Object.values(selectors.getUser(state))[5],
        canAddAlbum:Object.values(selectors.getUser(state))[6],
        canAddArtist:Object.values(selectors.getUser(state))[8],
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
    }),
    dispatch => ({
        onSubmit(value){
    }
}))(MyIce)