import { connect } from 'react-redux';
import React, { Fragment } from 'react'
import Header from '../Header'
import Container from '../Container';
import Footer from '../Footer';
import {Client, TrackHandler } from 'spotify-sdk'; 
import * as elementActions from '../../actions/elemnts'
import * as actions from '../../actions/report'
import * as types from '../../types/reportSections'
import { withRouter } from "react-router";
import * as selectors from '../../reducers'
import * as spotifyActions from '../../actions/spotify'
import * as appActions from '../../actions/app'

class AppState extends React.Component{
    
    componentDidMount(){
        const{ location } = this.props;
        if(Object.values(location)[2].split('&')[0].split('=')[1] && this.props.token!==Object.values(location)[2].split('&')[0].split('=')[1]){
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
        this.props.onSubmit(appActions.setToNull())
        this.props.onSubmit(actions.setToNull())
        fetch('http://localhost:8080/api/getsongs',{method:'GET'})
        .then(response => response.json())
        .then(async(data) => {
            data.map(element => { 
            track.search(Object.values(element)[9], {limit: 1}).then((trackCollection) => {
                this.props.onSubmit(elementActions.addSong({...element,
                    image:Object.values(Object.values(Object.values(trackCollection[0])[0])[6][0])[1],
                    song:Object.values(Object.values(trackCollection[0])[7])[0]
                    }))
            });  
            return null
            });
        })

        fetch('http://localhost:8080/api/artist',{method:'GET'})
        .then(response => response.json())
        .then(data => {
            this.props.onSubmit(appActions.addSection('artist',data))
        })

        fetch('http://localhost:8080/api/genre',{method:'GET'})
        .then(response => response.json())
        .then(data => {
            this.props.onSubmit(appActions.addSection('genre',data))
        })

        fetch('http://localhost:8080/api/album',{method:'GET'})
        .then(response => response.json())
        .then(data => {
            this.props.onSubmit(appActions.addSection('album',data))
        })

        fetch('http://localhost:8080/api/mediatype',{method:'GET'})
        .then(response => response.json())
        .then(data => {
            this.props.onSubmit(appActions.addSection('medyatype',data))
        })

        fetch('http://localhost:8080/api/reports/commongenre',{method:'GET'})
        .then(response => response.json())
        .then(data => {
            this.props.onSubmit(actions.addReportSection(types.GET_GENRE_WITH_MORE_SONGS,data))
        })

        fetch('http://localhost:8080/api/reports/commonartist',{method:'GET'})
        .then(response => response.json())
        .then(data => {
            this.props.onSubmit(actions.addReportSection(types.GET_ARTIST_WITH_MORE_ALBUMS,data))
        })


        fetch('http://localhost:8080/api/reports/longestsong',{method:'GET'})
        .then(response => response.json())
        .then(data => {
            this.props.onSubmit(actions.addReportSection(types.GET_LONGEST_SONG,data))
        })

        fetch('http://localhost:8080/api/reports/durationgenre',{method:'GET'})
        .then(response => response.json())
        .then(data => {
            this.props.onSubmit(actions.addReportSection(types.GET_GENRE_BY_DURATION,data))
        })

        fetch('http://localhost:8080/api/reports/colaborativeartist',{method:'GET'})
        .then(response => response.json())
        .then(data => {
            this.props.onSubmit(actions.addReportSection(types.GET_MORE_COLABORATIVE_ARTIST,data))
        })


        fetch('http://localhost:8080/api/reports/recentalbum',{method:'GET'})
        .then(response => response.json())
        .then(data => {
            this.props.onSubmit(actions.addReportSection(types.GET_MORE_RECENT_ABLUMS,data))
        })

        fetch('http://localhost:8080/api/reports/morealbumadded',{method:'GET'})
        .then(response => response.json())
        .then(data => {
            this.props.onSubmit(actions.addReportSection(types.GET_USERS_WITH_MORE_ALBUMS_ADDED,data))
        })
    }

    render(){
        return(
            <Fragment>
                <Header></Header>
                <Container></Container>
                <Footer></Footer>
            </Fragment>
        )
    }
}

export default withRouter(connect(
    state=>({
        token: selectors.getToken(state)
    }),
    dispatch =>({
        onSubmit(toAdd){
            dispatch(toAdd)
        },
        setToken(token){
            dispatch(spotifyActions.setToken(token))
        }
    })
)(AppState)) 