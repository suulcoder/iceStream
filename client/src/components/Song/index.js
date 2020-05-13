import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/elemnts'

const Song = ({id,name,type,onSubmit,state}) => (
    <Fragment>
        <div className="track">
            <button className="play" type="submit" onClick={
                () => onSubmit(id)
            }>
            </button>
            <div className="trackname">{name}</div>
        </div>
    </Fragment>

)

export default connect(
    (state, {id})=>({
            id:selectors.getElement(state,id).id,
            name:(selectors.getElement(state,id))?selectors.getElement(state,id).name:'',
            milliseconds: (selectors.getElement(state,id))?selectors.getElement(state,id).milliseconds:'',
        }),
    (dispatch, {nameToID, artistToID}) => ({
        onSubmit(id,type,state){
            fetch(`https://https://cors-anywhere.herokuapp.com/api.deezer.com/search/track/?q=${nameToID} ${artistToID}&index=0&limit=1api.deezer.com/search/track/?q=${nameToID} ${artistToID}&index=0&limit=1`).then(
                response => response.json().then(value => dispatch(actions.selectElementDeezer(value.data[0].id)))
            )
            dispatch(actions.selectElement(id))
        }
    })
)(Song)