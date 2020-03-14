import './styles.css';
import React, {Fragment} from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Element from '../Element'

const Playlist = ({elements}) => (
    <Fragment>
        <div className="playlists">
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
    undefined,
    undefined
)(Playlist)
