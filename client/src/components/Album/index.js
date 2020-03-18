import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';

const Album = ({albumid,title,artist,image,album,onSubmit}) => (
    <Fragment>
        <div className="album"> 
                <div className="album_">
                    <img alt='' src={image} className="image"></img>
                    <button className="link" type="submit" onClick={
                        () => onSubmit(album)}>
                    </button>
                    <div className="albuminfo">
                        <div className="albumtitle"><strong>ALBUM:</strong></div>
                        <div><strong>Title: </strong> {title}</div>
                        <div><strong>Artist: </strong> {artist}</div>
                    </div>
                </div>
                <div>
                    <button className="edit" type="submit" onClick={
                        () => onSubmit(albumid)
                    }>
                    </button>
                    <button className="delete" type="submit" onClick={
                        () => onSubmit(albumid)
                    }>
                    </button>
                </div>                
        </div>
    </Fragment>
)

export default connect(
    (state, {id})=>({
        albumid:Object.values(selectors.getElement(state,id))[1],
        title:Object.values(selectors.getElement(state,id))[2],
        artist:Object.values(selectors.getElement(state,id))[3],
        image:Object.values(selectors.getElement(state,id))[4],
        album:Object.values(selectors.getElement(state,id))[5],
    }),
    dispatch=>({
        onSubmit(album){
            window.location.href = album;
        }
    })
)(Album)