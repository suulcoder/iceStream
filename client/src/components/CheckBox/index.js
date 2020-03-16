import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';

const UserPermission = ({property,value,onSubmit}) => (
    <Fragment>
        {
        (value!==null)?(
            <button className={(value)?('check_button'):('cross_button')} type="submit" onClick={
                () => onSubmit(property,value)
            }>
            </button>   
        ):(
            <button className='invalid_button' onClick={
                () => onSubmit(value)
            }>
            </button>   
        )
    }
    </Fragment>     
)

export default connect(
    (state, {id,property})=>{
        switch (property) {
            case 'canLogin':
                return ({
                    id,
                    value: Object.values(selectors.getUsers(state,id))[4],
                    property
                })
            case 'canAddArtist':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[5],
                    property,
                    id
                })
            case 'canAddAlbum':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[6],
                    property,
                    id
                })
            case 'canAddTrack':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[7],
                    property,
                    id
                })
            case 'canInactivate':
                return ({
                    value : (Object.values(selectors.getSelected(state))[0]==='track')?(Object.values(selectors.getUsers(state,id))[8]):(null),
                    property,
                    id
                })
            case 'canModify':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[9],
                    property,
                    id
                }) 
            case 'canDelete':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[10],
                    property,
                    id
                })
            default:
                return({
                    value: null,
                    property,
                    id
                })
    }},
    undefined
)(UserPermission)
