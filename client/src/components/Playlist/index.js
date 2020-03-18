import './styles.css';
import React from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Element from '../Element'

const Playlist = ({elements, nombre,image,artist,showSongs}) => (
    <div className="containerPlay">
        <div className="playlistInfo">
            <div className="titlePlaylist"><strong>Title:</strong>{nombre}</div>
            <div className="artistPlaylist"><strong>artist:</strong> {artist}</div>
            <img alt='' src={image} className="playlistImage"></img>
        </div>
        <div className="playlist">
            {elements.map(
                element => (
                    <Element key={element} showSong={showSongs} id={element}>
                    </Element>
                )
        )}
      </div>
    </div>
  )

export default connect(
    (state, {id,showSongs})=>({
        showSongs,
        elements:selectors.getSection(state,id),
        nombre: Object.values(selectors.getElement(state,selectors.getSection(state,id)[0]))[3],
        image: Object.values(selectors.getElement(state,selectors.getSection(state,id)[0]))[11],
        artist: Object.values(selectors.getElement(state,selectors.getSection(state,id)[0]))[10]
    }),
    undefined
)(Playlist)
