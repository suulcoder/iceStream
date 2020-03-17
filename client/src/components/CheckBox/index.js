import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/user'

const UserPermission = ({property,value,onSubmit,id}) => (
    <Fragment>
        {
        <button className={(value)?('check_button'):('cross_button')} type="submit" onClick={
            () => onSubmit(property,value,id)
        }>
        </button>           
    }
    </Fragment>     
)

export default connect(
    (state, {id,property})=>{
        switch (property) {
            case 'canLogin':
                return ({
                    id:selectors.getUsers(state,id),
                    value: Object.values(selectors.getUsers(state,id))[4],
                    property
                })
            case 'canAddArtist':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[5],
                    property,
                    id:selectors.getUsers(state,id)
                })
            case 'canAddAlbum':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[6],
                    property,
                    id:selectors.getUsers(state,id)
                })
            case 'canAddTrack':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[7],
                    property,
                    id:selectors.getUsers(state,id)
                })
            case 'canInactivateSong':
                return ({
                    value : Object.values(selectors.getUsers(state,id))[8],
                    property,
                    id:selectors.getUsers(state,id)
                })
            case 'canModifySong':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[9],
                    property,
                    id:selectors.getUsers(state,id)
                }) 
            case 'canDeleteSong':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[10],
                    property,
                    id:selectors.getUsers(state,id)
                })
            case 'canModifyAlbum':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[11],
                    property,
                    id:selectors.getUsers(state,id)
                }) 
            case 'canDeleteAlbum':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[12],
                    property,
                    id:selectors.getUsers(state,id)
                })
            case 'canModifyArtist':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[13],
                    property,
                    id:selectors.getUsers(state,id)
                }) 
            case 'canDeleteArtist':
                return ({
                    value: Object.values(selectors.getUsers(state,id))[14],
                    property,
                    id:selectors.getUsers(state,id)
                })
            default:
                return({
                    value: null,
                    property,
                    id:selectors.getUsers(state,id)
                })
    }},
    dispatch => ({
        onSubmit(property,value,id){
            let newHash = {}
            switch (property) {
                case 'canLogin':
                    const canlogin = !value
                    newHash = {...id,canlogin}
                    break;
                case 'canAddArtist':
                    const canaddartist=!value
                    newHash = {...id,canaddartist}
                    break;
                case 'canAddAlbum':
                    const canaddalbum=!value
                    newHash = {...id,canaddalbum}
                    break;
                case 'canAddTrack':
                    const canaddtrack=!value
                    newHash={...id,canaddtrack}
                    break;
                case 'canInactivateSong':
                    const caninactivatesong=!value
                    newHash={...id,caninactivatesong}
                    break;
                case 'canModifySong':
                    const canmodifiysong=!value
                    newHash={...id,canmodifiysong}
                    break;
                case 'canDeleteSong':
                    const candeletesong=!value
                    newHash={...id,candeletesong}
                    break;
                case 'canModifyAlbum':
                    const canmodifiyalbum=!value
                    newHash={...id,canmodifiyalbum}
                    break;
                case 'canDeleteAlbum':
                    const candeletealbum=!value
                    newHash={...id,candeletealbum}
                    break;
                case 'canModifyArtist':
                    const canmodifyartist=!value
                    newHash={...id,canmodifyartist}
                    break;
                case 'canDeleteArtist':
                    const candeleteartist=!value
                    newHash={...id,candeleteartist}
                    break;
                default:
                    break
            }
            const request = new Request('http://localhost:8080/api/permission/update',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({userid: Object.values(newHash)[3],
                    canlogin:(Object.values(newHash)[4])?('TRUE'):('FALSE'),
                    canaddartist:Object.values(newHash)[5]?('TRUE'):('FALSE'),
                    canaddalbum:Object.values(newHash)[6]?('TRUE'):('FALSE'),
                    canaddtrack:Object.values(newHash)[7]?('TRUE'):('FALSE'),
                    caninactivatesong:Object.values(newHash)[8]?('TRUE'):('FALSE'),
                    canmodifiysong:Object.values(newHash)[9]?('TRUE'):('FALSE'),
                    candeletesong:Object.values(newHash)[10]?('TRUE'):('FALSE'),
                    canmodifiyalbum:Object.values(newHash)[11]?('TRUE'):('FALSE'),
                    candeletealbum:Object.values(newHash)[12]?('TRUE'):('FALSE'),
                    canmodifyartist:Object.values(newHash)[13]?('TRUE'):('FALSE'),
                    candeleteartist:Object.values(newHash)[14]?('TRUE'):('FALSE'),
                })
            })
            fetch(request)
                .then(async(response)=>{
                    response.json()
                    .then(table => {
                        console.log(table)
                    })})
            dispatch(actions.addUser(newHash))
        }
    })
)(UserPermission)
