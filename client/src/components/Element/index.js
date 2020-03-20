import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Song from '../Song'
import Artist from '../Artist';
import Album from '../Album';
import Track from '../Track'

const Element = ({type,id,app,showSong,isEdited}) => (
    <Fragment>
        {(app===2 && !showSong)?(
            (type==='track')?(
                <Track key={id} id={id} isEdited={isEdited}></Track>
            ):((type==='artist')?(
                <Artist key={id} id={id} isEdited={isEdited}></Artist>
            ):(
                <Album key={id} id={id} isEdited={isEdited}></Album>
            ))
        ):(
            <Song key={id} id={id}></Song>
        )}
    </Fragment>
    
)

export default connect(
    (state, {id,showSong})=>({
            showSong,
            app:selectors.getAppState(state),
            type:Object.values(selectors.getElement(state,id))[0],
            id:id,
            isEdited: selectors.getEdited(state)===id
        }),
    undefined
)(Element)
