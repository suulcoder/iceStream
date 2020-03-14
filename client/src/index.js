import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './styles.css';
import { Provider } from 'react-redux';
import AppState from './components/AppState'
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import reducer from './reducers';
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'
import {Client, TrackHandler, PlaylistHandler} from 'spotify-sdk';

const persistedState = loadState()
const store = createStore(reducer,persistedState);
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


store.subscribe(throttle(()=>{
  saveState(store.getState());
}),1000)

const App = () => (
  <Provider store={store}>
      <Router>
        <Route path="/" component={AppState}/>
      </Router>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
