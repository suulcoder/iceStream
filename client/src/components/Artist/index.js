import './styles.css';
import React, { Fragment,useState } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/elemnts'

const Artist = ({artistid,name,image,artist,onSubmit,canModify,canDelete,onDelete,isEdited,onUpdate,onEdit,element}) => {
    const [artistName,changeName] = useState(name)  
    return (
    <Fragment>
        <div className="artist"> 
                <div className="artist_">
                    <img alt='' src={image} className="image"></img>
                    <button className="link" type="submit" onClick={
                        () => onSubmit(artist)}>
                    </button>
                    <div className="artistinfo">
                        <div className="artistitle"><strong>ARTIST:</strong></div>
                        {
                            (isEdited)?(
                                <div><strong>Name:</strong>
                                    <input
                                    className="input_"
                                    type="text"
                                    placeholder="Artist Name"
                                    value={artistName}
                                    onChange={e => changeName(e.target.value)}
                                    />
                                </div>
                            ):(
                                <div><strong>Name:</strong> {name}</div>
                            )
                        }
                        
                    </div>
                </div>
                <div>
                {
                    (canModify && !isEdited)?(
                        <button className="edit" type="submit" onClick={
                            () => onEdit(artistid)
                        }>
                        </button>
                    ):(
                        (canModify)?(
                            <button className="save" type="submit" onClick={
                                () => onUpdate(artistid,artistName,element)
                            }>
                            </button>
                        ):(
                            <Fragment></Fragment>
                        )
                        
                    )
                }
                {
                    (canDelete)?(
                        <button className="delete" type="submit" onClick={
                            () => onDelete(artistid)
                        }>
                        </button>
                    ):(
                        <div/>
                    )
                }
                </div>                
        </div>
    </Fragment>
)}

export default connect(
    (state, {id,isEdited})=>({
        artistid:Object.values(selectors.getElement(state,id))[1],
        name:Object.values(selectors.getElement(state,id))[2],
        image:Object.values(selectors.getElement(state,id))[3],
        artist:Object.values(selectors.getElement(state,id))[4],
        canModify:Object.values(selectors.getUser(state))[13],
        canDelete:Object.values(selectors.getUser(state))[14],
        isEdited,
        element:selectors.getElement(state,id)
    }),
    dispatch=>({
        onSubmit(artist){
            window.location.href = artist;
        },
        onDelete(id){
            alert("ALL ALBUMS WILL BE DELETED TOO")
            const artistid = id.split('artist')[1]
            const request = new Request('http://localhost:8080/api/actions/delete/artist',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({id:artistid})
            })
            fetch(request)
                .then(async(response)=>{
                    response.json()
                    .then(table => {
                        dispatch(actions.deleteElement(id))
                    })
                })
        },
        onEdit(id){
            dispatch(actions.editElement(id))
        },
        onUpdate(id,name,element){
            const artistid = id.split('artist')[1]
            const request = new Request('http://localhost:8080/api/actions/update/artist',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({id:artistid,name:name})
            })
            fetch(request)
                .then(async(response)=>{
                    response.json()
                    .then(table => {
                        dispatch(actions.upadateArtist({...element,name}))
                        dispatch(actions.editElement(null))
                    })
                })
        }
    })
)(Artist)