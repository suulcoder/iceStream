import './styles.css';
import React, {Fragment} from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Element from '../Element'

const Playlist = ({elements, nombre}) => (
    <div className="containerPlay">
        <div className="titlePlaylist">{nombre}</div>
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
        nombre: id
    }),
    undefined
)(Playlist)
