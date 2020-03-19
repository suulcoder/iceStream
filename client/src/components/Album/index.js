import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/elemnts'

const Album = ({albumid,title,artist,image,album,onSubmit,canModify,canDelete,onDelete}) => (
    <Fragment>
        <div className="album"> 
                <div className="album_">
                    <img alt='' src={image} className="image"></img>
                    <button className="link" type="submit" onClick={
                        () => onSubmit(album)}>
                    </button>
                    <div className="albuminfo">
                        <div className="albumtitle"><strong>ALBUM:</strong></div>
                        <div><strong>Title: </strong> {title}</div>
                        <div><strong>Artist: </strong> {artist}</div>
                    </div>
                </div>
                <div>
                    {
                        (canModify)?(
                            <button className="edit" type="submit" onClick={
                                () => onSubmit(albumid)
                            }>
                            </button>
                        ):(
                            <div/>
                        )
                    }
                    {
                        (canDelete)?(
                            <button className="delete" type="submit" onClick={
                                () => onDelete(albumid)
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
        albumid:Object.values(selectors.getElement(state,id))[1],
        title:Object.values(selectors.getElement(state,id))[2],
        artist:Object.values(selectors.getElement(state,id))[3],
        image:Object.values(selectors.getElement(state,id))[4],
        album:Object.values(selectors.getElement(state,id))[5],
        canModify:Object.values(selectors.getUser(state))[11],
        canDelete:Object.values(selectors.getUser(state))[12],
    }),
    dispatch=>({
        onSubmit(album){
            window.location.href = album;
        },
        onDelete(id){
            const albumid = id.split('album')[1]
            const request = new Request('http://localhost:8080/api/actions/delete/album',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({id:albumid})
            })
            fetch(request)
                .then(async(response)=>{
                    response.json()
                    .then(table => {
                        dispatch(actions.deleteElement(id))
                        dispatch(actions.deleteSection(albumid))
                    })
                })
        }
    })
)(Album)