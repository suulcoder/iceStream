import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';

const Artist = ({artistid,name,image,artist,onSubmit,canModify,canDelete}) => (
    <Fragment>
        <div className="artist"> 
                <div className="artist_">
                    <img alt='' src={image} className="image"></img>
                    <button className="link" type="submit" onClick={
                        () => onSubmit(artist)}>
                    </button>
                    <div className="artistinfo">
                        <div className="artistitle"><strong>ARTIST:</strong></div>
                        <div><strong>Name: </strong> {name}</div>
                    </div>
                </div>
                <div>
                {
                    (canModify)?(
                        <button className="edit" type="submit" onClick={
                            () => onSubmit(artistid)
                        }>
                        </button>
                    ):(
                        <div/>
                    )
                }
                {
                    (canDelete)?(
                        <button className="delete" type="submit" onClick={
                            () => onSubmit(artistid)
                        }>
                        </button>
                    ):(
                        <div/>
                    )
                }
                </div>                
        </div>
    </Fragment>
)

export default connect(
    (state, {id})=>({
        artistid:Object.values(selectors.getElement(state,id))[1],
        name:Object.values(selectors.getElement(state,id))[2],
        image:Object.values(selectors.getElement(state,id))[3],
        artist:Object.values(selectors.getElement(state,id))[4],
        canModify:Object.values(selectors.getUser(state))[13],
        canDelete:Object.values(selectors.getUser(state))[14],
    }),
    dispatch=>({
        onSubmit(artist){
            window.location.href = artist;
        }
    })
)(Artist)