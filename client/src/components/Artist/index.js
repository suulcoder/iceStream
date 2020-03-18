import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';

const Artist = ({artistid,name,image,onSubmit}) => (
    <Fragment>
        <div className="artist"> 
                <div className="artist_">
                    <img alt='' src={image} className="image"></img>
                    <div className="artistinfo">
                        <div className="artistitle"><strong>ARTIST:</strong></div>
                        <div><strong>Name: </strong> {name}</div>
                    </div>
                </div>
                <div>
                    <button className="edit" type="submit" onClick={
                        () => onSubmit(artistid)
                    }>
                    </button>
                    <button className="delete" type="submit" onClick={
                        () => onSubmit(artistid)
                    }>
                    </button>
                </div>                
        </div>
    </Fragment>
)

export default connect(
    (state, {id})=>({
        artistid:Object.values(selectors.getElement(state,id))[1],
        name:Object.values(selectors.getElement(state,id))[2],
        image:Object.values(selectors.getElement(state,id))[3],
    }),
    undefined
)(Artist)