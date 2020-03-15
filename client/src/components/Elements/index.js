import './styles.css';
import React, {Fragment} from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Playlist from '../Playlist'

const Elements = ({playlists}) => (
  <Fragment>
      <div className="playlists">
          {playlists.map(
              playlist => (
                  <Playlist key={playlist} id={playlist}>
                  </Playlist>
              )
      )}
    </div>
  </Fragment>
)

export default connect(
  state=>({
    playlists: selectors.getSectionIDs(state)
  }),
  undefined
)(Elements)