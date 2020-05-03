import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/elemnts'

const Song = ({id,name,type,onSubmit,state}) => (
    <Fragment>
        <div className="track">
            <button className="play" type="submit" onClick={
                () => onSubmit(id,)
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
    dispatch => ({
        onSubmit(id,type,state){
            dispatch(actions.selectElement(id))
        }
    })
)(Song)