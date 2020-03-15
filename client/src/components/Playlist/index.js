import './styles.css';
import React, {Fragment} from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Element from '../Element'

const Playlist = ({elements, nombre,image,artist}) => (
    <div className="containerPlay">
        <div className="playlistInfo">
            <div className="titlePlaylist"><strong>Title:</strong>{nombre}</div>
            <div className="artistPlaylist"><strong>artist:</strong> {artist}</div>
            <img src={image} className="playlistImage"></img>
        </div>
        <div className="playlist">
            {elements.map(
                element => (
                    <Element key={element} id={element}>
                    </Element>
                )
        )}
      </div>
    </div>
  )

export default connect(
    (state, {id})=>({
        elements:selectors.getSection(state,id),
        nombre: id.split('|')[0],
        image: id.split('|')[1],
        artist: id.split('|')[2]
    }),
    undefined
)(Playlist)
