import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/elemnts'

const Song = ({id,name,onSubmit}) => (
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
            id:Object.values(selectors.getElement(state,id))[1],
            name:Object.values(selectors.getElement(state,id))[2],
            milliseconds: Object.values(selectors.getElement(state,id))[7],
        }),
    dispatch => ({
        onSubmit(id){
            dispatch(actions.selectElement(id))
        }
    })
)(Song)