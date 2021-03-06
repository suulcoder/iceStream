import {connect} from 'react-redux';
import React, {Fragment} from 'react'
import Header from '../Header'
import Container from '../Container';
import Footer from '../Footer';
import {Client, TrackHandler} from 'spotify-sdk';
import * as elementActions from '../../actions/elemnts'
import * as actions from '../../actions/report'
import * as types from '../../types/reportSections'
import {withRouter} from "react-router";
import * as selectors from '../../reducers'
import * as spotifyActions from '../../actions/spotify'
import * as appActions from '../../actions/app'
import * as userActions from '../../actions/user'
import * as simulateActions from '../../actions/simulation'

class AppState extends React.Component {

    componentDidMount() {
        const {location} = this.props;
        if (Object.values(location)[2].split('&')[0].split('=')[1] && this.props.token !== Object.values(location)[2].split('&')[0].split('=')[1]) {
            this.props.setToken(Object.values(location)[2].split('&')[0].split('=')[1])
        }
        let client = Client.instance;
        client.settings = {
            clientId: '9dd9df7b812f484c91490a594286ca76',
            secretId: 'af949b03d32045a19d5d4177dcb679b3',
            scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
            redirect_uri: 'http://localhost:8888/'
        };
        client.token = this.props.token
        var track = new TrackHandler();
        this.props.onSubmit(elementActions.setToNull())
        //this.props.onSubmit(appActions.setToNull())
        //this.props.onSubmit(actions.setToNull())

        fetch('http://localhost:8080/api/getsongs', {method: 'GET'})
            .then(response => response.json())
            .then(async (data) => {
                const myData = []
                data.map(element => {
                    myData.push([element.trackid, element.name])
                    /*fetch(`https://api.deezer.com/search/track/?q=${element.name}&index=0&limit=1`).then(response => response.json().then(value => {
                        setTimeout(() =>console.log(value.data, 'Look at me!'), 1000)
                    }))*/
                    track.search(Object.values(element)[9], {limit: 1}).then((trackCollection) => {
                        if (trackCollection[0] === undefined) {
                            this.props.onSubmit(elementActions.addSong({...element}))
                            this.props.onSubmit(elementActions.updateSong({...element}))
                        } else {
                            //console.log(Object.values(trackCollection)[0], ' Look at me!!!')
                            this.props.onSubmit(elementActions.addSong(
                                {
                                    ...element,
                                    image: Object.values(Object.values(Object.values(trackCollection[0])[0])[6][0])[1],
                                    song: Object.values(Object.values(trackCollection[0])[7])[0]
                                }))
                            this.props.onSubmit(elementActions.updateSong({
                                ...element,
                                image: Object.values(Object.values(Object.values(trackCollection[0])[0])[6][0])[1],
                                song: Object.values(Object.values(trackCollection[0])[7])[0]
                            }))
                        }

                    });
                    return null
                });
                this.props.onSubmit(simulateActions.setValidTracks(myData))
            })

        fetch('http://localhost:8080/api/artist', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(appActions.addSection('artist', data))
            })

        fetch('http://localhost:8080/api/genre', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(appActions.addSection('genre', data))
            })

        fetch('http://localhost:8080/api/album', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(appActions.addSection('album', data))
                data.map(element => {
                    track.search(Object.values(element)[1], {limit: 1}).then((trackCollection) => {
                        if (trackCollection[0] === undefined) {
                            //this.props.onSubmit(actions.addAlbum({...element}))
                        } else {
                            this.props.onSubmit(elementActions.addAlbum({
                                ...element,
                                image: Object.values(Object.values(Object.values(trackCollection[0])[0])[6][0])[1],
                                album: Object.values(Object.values(Object.values(trackCollection[0])[0])[3])[0],
                            }))
                        }
                    });
                    return null
                })
            })

        const request2 = new Request('http://localhost:8080/api/boughtTracks',{
            method:'POST',  
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify({user:this.props.userid})
        })
        fetch(request2)
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(element => {
                this.props.onSubmit(userActions.addBoughtTrack(element))
            });
        })  

        fetch('http://localhost:8080/api/media', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(appActions.addSection('mediatype', data))
            })

        fetch('http://localhost:8080/api/tracknames', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(appActions.addSection('track', data))
            })

        fetch('http://localhost:8080/api/playlist', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(appActions.addSection('playlist', data))
            })

        fetch('http://localhost:8080/api/reports/commongenre', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(actions.addReportSection(types.GET_GENRE_WITH_MORE_SONGS, data))
            })

        fetch('http://localhost:8080/api/reports/commonartist', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(actions.addReportSection(types.GET_ARTIST_WITH_MORE_ALBUMS, data))
            })


        fetch('http://localhost:8080/api/reports/longestsong', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(actions.addReportSection(types.GET_LONGEST_SONG, data))
            })

        fetch('http://localhost:8080/api/reports/durationgenre', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(actions.addReportSection(types.GET_GENRE_BY_DURATION, data))
            })

        fetch('http://localhost:8080/api/reports/colaborativeartist', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(actions.addReportSection(types.GET_MORE_COLABORATIVE_ARTIST, data))
            })

        fetch('http://localhost:8080/api/reports/moretrackadded', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(actions.addReportSection(types.GET_USERS_WITH_MORE_TRACK_ADDED, data))
            })

        fetch('http://localhost:8080/api/reports/playlistduration', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(actions.addReportSection(types.GET_PLAYLIST_BY_DURATION, data))
            })

        fetch('http://localhost:8080/api/reports/playlist_artist', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(actions.addReportSection(types.GET_PLAYLIST_BY_ARTIST_COUNT, data))
            })

        fetch('http://localhost:8080/api/reports/artist_genre', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(actions.addReportSection(types.GET_ARTIST_BY_GENRE_COUNT, data))
            })

        fetch('http://localhost:8080/api/reports/recentalbum', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(actions.addReportSection(types.GET_MORE_RECENT_ABLUMS, data))
            })

        fetch('http://localhost:8080/api/reports/morealbumadded', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.props.onSubmit(actions.addReportSection(types.GET_USERS_WITH_MORE_ALBUMS_ADDED, data))
            })

    }

    render() {
        return (
            <Fragment>
                <Header></Header>
                <Container></Container>
                <Footer></Footer>
            </Fragment>
        )
    }
}

export default withRouter(connect(
    state => ({
        token: selectors.getToken(state),
        userid: selectors.getUser(state)? selectors.getUser(state).userid:null
    }),
    dispatch => ({
        onSubmit(toAdd) {
            dispatch(toAdd)
        },
        setToken(token) {
            dispatch(spotifyActions.setToken(token))
        }
    })
)(AppState)) 