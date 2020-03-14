import './styles.css';
import React from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import {Client, TrackHandler, PlaylistHandler} from 'spotify-sdk';

const Element = ({done}) => (
    <div>
        {console.log(done)}
    </div>
)

export default connect(
    state=>{
        let client = Client.instance;
        client.settings = {
            clientId: '9dd9df7b812f484c91490a594286ca76',
            secretId: 'af949b03d32045a19d5d4177dcb679b3',
            scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
            redirect_uri: 'http://localhost:8888/'
        };
        client.token = 'BQDA8O6PEI6W0DL_bLz8vVY8SlRj3-Mchw09uDD8N3u9bPEQEEcUbwBM3AUaD6qy2qJhN3pyqsy_Kv1gZ-q36grh5IbOuYe3ZRJXdD8P7PshxPjKgKaqGcAVRrtpyOwZt7jvkUkfn92PvIe6b2jLcezFF7EAJCH4ydbZVYlcGyu5hVRpFydDtsM';
        var track = new TrackHandler();
        track.search('R U mine?', {limit: 1}).then((trackCollection) => {
            console.log(trackCollection);
        });
        return({done:null})
    },
    undefined
)(Element)
