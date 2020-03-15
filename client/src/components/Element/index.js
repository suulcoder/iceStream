import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Song from '../Song'
import Artist from '../Artist';
import Album from '../Album';

const Element = ({type,id}) => (
    <Fragment>
        {(type==='track')?(
            <Song key={id} id={id}></Song>
        ):((type==='artist')?(
            <Artist key={id} id={id}></Artist>
        ):(
            <Album key={id} id={id}></Album>
        ))
        }
    </Fragment>
    
)

export default connect(
    (state, {id})=>({
            type:Object.values(selectors.getElement(state,id))[0],
            id:id        
        }),
    undefined
)(Element)
