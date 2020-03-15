import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';

const Song = ({type,id,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song}) => (
    <Fragment>
        <div className="track">
            <button className="play">
            </button>
            <div className="trackname">{name}</div>
        </div>
    </Fragment>
    
)

export default connect(
    (state, {id})=>({
            type:Object.values(selectors.getElement(state,id))[0],
            id:Object.values(selectors.getElement(state,id))[1],
            name:Object.values(selectors.getElement(state,id))[2],
            album:Object.values(selectors.getElement(state,id))[3],
            mediatype: Object.values(selectors.getElement(state,id))[4],
            genre: Object.values(selectors.getElement(state,id))[5],
            composer: Object.values(selectors.getElement(state,id))[6],
            milliseconds: Object.values(selectors.getElement(state,id))[7],
            bytes: Object.values(selectors.getElement(state,id))[8],
            unitprice: Object.values(selectors.getElement(state,id))[9],
            artist: Object.values(selectors.getElement(state,id))[10],
            image: Object.values(selectors.getElement(state,id))[11],
            song: Object.values(selectors.getElement(state,id))[12],            
        }),
    undefined
)(Song)