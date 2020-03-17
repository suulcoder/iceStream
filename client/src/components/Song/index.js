import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/elemnts'
import * as useractions from '../../actions/user'

const Song = ({id,name,type,onSubmit,state}) => (
    <Fragment>
        <div className="track">
            <button className="play" type="submit" onClick={
                () => onSubmit(id,type,state)
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
            type: Object.values(selectors.getElement(state,id))[0],
            state,
        }),
    dispatch => ({
        onSubmit(id,type,state){
            dispatch(actions.selectElement(id))
        }
    })
)(Song)