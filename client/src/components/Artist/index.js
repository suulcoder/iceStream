import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';

const Artist = ({type,id,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song}) => (
    <Fragment>
        <div className="artist">
                <img src={image} className="image"></img>
        </div>
    </Fragment>
)

export default connect(
    (state, {id})=>({
            type:Object.values(selectors.getElement(state,id))[0],
            id:Object.values(selectors.getElement(state,id))[1],
            name:Object.values(selectors.getElement(state,id))[2], 
            image:Object.values(selectors.getElement(state,id))[3],           
        }),
    undefined
)(Artist)