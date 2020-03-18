import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';

const Track = ({trackid,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song,onSubmit,canDelete,canModify,canInactivate}) => (
    <Fragment>
        <div className="song_"> 
                <div className="track_">
                    <img alt='' src={image} className="image"></img>
                    <button className="link" type="submit" onClick={
                        () => onSubmit(song)}>
                    </button>
                    <div className="track_info">
                        <div><strong>Name: </strong>{name}</div>
                        <div><strong>Album: </strong>{album}</div>
                        <div><strong>Artist: </strong>{artist}</div>
                        <div><strong>Genre: </strong>{genre}</div>
                    </div>
                    <div className="track_info">
                        <div><strong>Composer: </strong>{composer}</div>
                        <div><strong>MediaType: </strong>{mediatype}</div>
                        <div><strong>Duration: </strong>{Math.floor(milliseconds / 60000) + ":" + ((milliseconds % 60000) / 1000).toFixed(0)}</div>
                        <div><strong>Price: </strong>${unitprice}</div>
                        <div><strong>Size: </strong>{((bytes/1024)/1024).toFixed(2)}Mb</div>
                    </div>
                </div>
                <div className="options">
                    {
                        (canInactivate)?(
                            <button className="inactivate" type="submit" onClick={
                                () => onSubmit(trackid)
                            }>
                            </button>
                        ):(
                            <div/>
                        )
                    }
                    {
                        (canModify)?(
                            <button className="edit" type="submit" onClick={
                                () => onSubmit(trackid)
                            }>
                            </button>
                        ):(
                            <div/>
                        )
                    }
                    {
                        (canDelete)?(
                            <button className="delete" type="submit" onClick={
                                () => onSubmit(trackid)
                            }>
                            </button>
                        ):(
                            <div/>
                        )
                    }
                </div>                
        </div>
    </Fragment>
)

export default connect(
    (state, {id})=>({
        type:Object.values(selectors.getElement(state,id))[0],
        id:Object.values(selectors.getElement(state,id))[1],
        name:Object.values(selectors.getElement(state,id))[2],
        album:Object.values(selectors.getElement(state,id))[3],
        mediatype: Object.values(selectors.getElement(state,id))[4],
        genre: Object.values(selectors.getElement(state,id))[5],
        composer: Object.values(selectors.getElement(state,id))[6],
        milliseconds: Object.values(selectors.getElement(state,id))[7],
        bytes: Object.values(selectors.getElement(state,id))[8],
        unitprice: Object.values(selectors.getElement(state,id))[9],
        artist: Object.values(selectors.getElement(state,id))[10],
        image: Object.values(selectors.getElement(state,id))[11],
        song: Object.values(selectors.getElement(state,id))[12],
        canInactivate:Object.values(selectors.getUser(state))[8],
        canModify:Object.values(selectors.getUser(state))[9],
        canDelete:Object.values(selectors.getUser(state))[10],
    }),
    dispatch=>({
        onSubmit(track){
            window.location.href = track;
        }
    })
)(Track)