import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';

const Album = ({type,id,title,artist,album,image}) => (
    <Fragment>
        <div className="album">
                <img alt='' src={image} className="image"></img>
        </div>
    </Fragment> 
)

export default connect(
    (state, {id})=>({
            type:Object.values(selectors.getElement(state,id))[0],
            id:Object.values(selectors.getElement(state,id))[1],
            title:Object.values(selectors.getElement(state,id))[2], 
            artist:Object.values(selectors.getElement(state,id))[3],
            image:Object.values(selectors.getElement(state,id))[4],
            album:Object.values(selectors.getElement(state,id))[5],       
        }),
    undefined
)(Album)