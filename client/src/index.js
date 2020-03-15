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
import * as actions from './actions/elemnts'
import {Client, TrackHandler, ArtistHandler } from 'spotify-sdk'; 

//localStorage.clear();
const persistedState = loadState()
const store = createStore(reducer,persistedState);

let client = Client.instance;
client.settings = {
    clientId: '9dd9df7b812f484c91490a594286ca76',
    secretId: 'af949b03d32045a19d5d4177dcb679b3',
    scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
    redirect_uri: 'http://localhost:8888/'
};
client.token = 'BQAuy93TksRaBkl-RUP58OxI8ufwzxJTXYNrl_mfa__EYiSI4F8L8jqiU6-gztNjClaIMR4Jr2w4xzybz6GlSN4MY-RxFPR8HzMYiOyqctKBt3GCIP2l4RE2D72BlWcgLFx9KlaOh03MX9oDAH1tmBw7YCArkOazRy7Dgc2VIXbbD2Ud8rZiJbE';
//var track = new TrackHandler();
var artist = new ArtistHandler();

store.subscribe(throttle(()=>{
  saveState(store.getState());
}),1000)

fetch('http://localhost:8080/api/artist',{method:'GET'})
.then(response => response.json())
.then(async(data) => {
  data.map(element => { 
    artist.search(Object.values(element)[1]).then((artistCollection) => {
      store.dispatch(actions.addArtist({...element,
        image:Object.values(Object.values(artistCollection[0])[5][0])[1],
      }))
    });
    return null
  });
})

// fetch('http://localhost:8080/api/getalbums',{method:'GET'})
// .then(response => response.json())
// .then(async(data) => {
//   data.map(element => { 
//     track.search(Object.values(element)[0], {limit: 1}).then((trackCollection) => {
//       store.dispatch(actions.addAlbum({...element,
//         image:Object.values(Object.values(Object.values(trackCollection[0])[0])[6][0])[1],
//         album:Object.values(Object.values(Object.values(trackCollection[0])[0])[3])[0] 
//       }))
//     });  
//     return null
//   });
// })

// fetch('http://localhost:8080/api/getsongs',{method:'GET'})
// .then(response => response.json())
// .then(async(data) => {
//   data.map(element => { 
//     track.search(Object.values(element)[9], {limit: 1}).then((trackCollection) => {
//       store.dispatch(actions.addSong({...element,
//         image:Object.values(Object.values(Object.values(trackCollection[0])[0])[6][0])[1],
//         song:Object.values(trackCollection[0])[12]
//       }))
//     });  
//     return null
//   });
// })

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
