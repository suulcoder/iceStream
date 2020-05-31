import './styles.css';
import { v4 } from 'uuid';
import React, { Fragment,useState } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/elemnts'
import user, { getUser } from '../../reducers/user';

const Artist = ({userid,playlist, onDelete}) => (
    <div className="playlists_">
        <div className="text"><strong>PLAYLISTS:</strong></div>
        {playlist.map(
              list_ => (
                <div key={v4()}className="artist"> 
                    <div className="artist_">
                        <div className="artistinfo">
                            <div className="artistitle"><strong>Playlist:</strong></div>
                            {
                                <div className="text"><strong>Name:</strong> {list_.name}</div>
                            }
                            
                        </div>
                    </div>
                    <div>
                            <button className="delete" type="submit" onClick={
                                () => onDelete(list_.playlistid,userid)
                            }>
                            </button>
                    </div>                
            </div>
              )
      )}
    </div>
)

export default connect(
    (state)=>({
        playlist: selectors.getInfo(state,'playlist'),
        userid: selectors.getUser(state).userid,
    }),
    dispatch=>({
        onDelete(id,userid){
            const request1 = new Request('http://localhost:8080/api/playist/delete',{
            method:'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify({id,userid})
            })
            fetch(request1)
            .then(async(response)=>{
                window.location.href = 'http://localhost:3000/'
            })
        }
    })
)(Artist)