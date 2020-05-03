import './styles.css';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../reducers'
import * as userActions from '../../actions/user'
import * as actions from '../../actions/elemnts'
import * as appActions from '../../actions/app'
import {Client, TrackHandler,ArtistHandler } from 'spotify-sdk'; 
import * as elementActions from '../../actions/elemnts'

const Search = ({onSubmit,app,token}) => {
    const [query,changeQuery] = useState('')
    return (
        <div className="search">
            <input
            className="query"
            type="text"
            placeholder=" Search"
            value={query}
            onChange={e => changeQuery(e.target.value)}
            onKeyUp={e=> onSubmit(e.target.value,app,token)}
            />
        </div>
    )
}

export default connect(
    state=>({
        app:selectors.getAppState(state),
        token: selectors.getToken(state)
    }),
    dispatch => ({
        onSubmit(value,app,token){
            if(app===4){
                if(value){
                    dispatch(userActions.setEpmty())
                    const request = new Request('http://localhost:8080/api/search/user',{
                    method:'POST',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify({value:'%'+value+'%'})
                    })
                    fetch(request)
                        .then(async(response)=>{
                            response.json()
                            .then(table => {
                                table.rows.forEach(element => {  
                                    dispatch(userActions.addToOrder(element))
                                });
                            })
                        })
                }
                else{
                    fetch('http://localhost:8080/api/user',{method:'GET'})
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(element => {
                            dispatch(userActions.addUser(element))
                        });
                    }) 
                }
            }
            else if(app===1 || app===2){
                if(value===String('')){
                    dispatch(appActions.changeState(1))
                    dispatch(elementActions.setSearchtoNull())
                }
                else{
                    dispatch(elementActions.setSearchtoNull())
                    let client = Client.instance;
                    client.settings = {
                        clientId: '9dd9df7b812f484c91490a594286ca76',
                        secretId: 'af949b03d32045a19d5d4177dcb679b3',
                        scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
                        redirect_uri: 'http://localhost:8888/'
                    };
                    client.token = token
                    var track = new TrackHandler();
                    var artist = new ArtistHandler();
                    const request2 = new Request('http://localhost:8080/api/search/artist',{
                    method:'POST',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify({value:'%'+value+'%'})
                    })
                    fetch(request2)
                    .then(async(response)=>{
                        response.json()
                        .then(async(data) => {
                            data.rows.map(element => { 
                                artist.search(Object.values(element)[1])
                                .then((artistCollection) => {
                                    if(artistCollection[0]===undefined){
                                        dispatch(actions.addArtist({...element}))
                                    }
                                    else{
                                    dispatch(actions.addArtist({...element,
                                    image:Object.values(Object.values(artistCollection[0])[5][0])[1],
                                    artist:Object.values(Object.values(Object.values(artistCollection)[0])[0])[0]
                                }))}
                                dispatch(elementActions.addSearchELement('artist',Object.values(element)[0]))
                                });
                                return null
                        })})});
                    const request1 = new Request('http://localhost:8080/api/search/album',{
                        method:'POST',
                        headers: { 'Content-Type':'application/json'},
                        body: JSON.stringify({value:'%'+value+'%'})
                        })
                        fetch(request1)
                            .then(async(response)=>{
                                response.json()
                                .then(async(data) => {
                                    data.rows.map(element => {
                                        track.search(Object.values(element)[1], {limit: 1}).then((trackCollection) => {
                                            if (trackCollection[0]===undefined){
                                                dispatch(actions.addAlbum({...element}))
                                            }
                                            else{
                                            dispatch(actions.addAlbum({...element,
                                            image:Object.values(Object.values(Object.values(trackCollection[0])[0])[6][0])[1],
                                            album:Object.values(Object.values(Object.values(trackCollection[0])[0])[3])[0] 
                                        }))}
                                        dispatch(elementActions.addSearchELement('album',Object.values(element)[0]))
                                        });  
                                        return null
                                    })
                            })})
                    const request = new Request('http://localhost:8080/api/search/track',{
                        method:'POST',
                        headers: { 'Content-Type':'application/json'},
                        body: JSON.stringify({value:'%'+value+'%'})
                        })
                        fetch(request)
                            .then(async(response)=>{
                                response.json()
                                .then(async(data) => {
                                    data.rows.map(element => {
                                    track.search(Object.values(element)[0], {limit: 1}).then((trackCollection) => {
                                            if(trackCollection[0]===undefined){
                                                dispatch(elementActions.addSong({...element}))
                                            }
                                            else{
                                            dispatch(elementActions.addSong({...element,
                                            image:Object.values(Object.values(Object.values(trackCollection[0])[0])[6][0])[1],
                                            song:Object.values(Object.values(trackCollection[0])[7])[0]
                                            }))}
                                            dispatch(elementActions.addSearchELement('track',Object.values(element)[2]))
                                    });
                                    return null
                                    });
                                })
                            })
                    dispatch(appActions.changeState(2))
                }                
            }
        }
    })
)(Search)