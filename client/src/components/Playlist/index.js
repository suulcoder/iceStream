import './styles.css';
import React, {Fragment} from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Element from '../Element'

const Playlist = ({elements, nombre}) => (
    <Fragment>
        <div className="playlists">
            <h2>{nombre}</h2>
            {elements.map(
                element => (
                    <Element key={element} id={element}>
                    </Element>
                )
        )}
      </div>
    </Fragment>
  )

export default connect(
    (state, {id})=>({
        elements:selectors.getSection(state,id),
        nombre: id
    }),
    undefined
)(Playlist)
