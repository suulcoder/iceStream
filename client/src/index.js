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
import {Client, TrackHandler} from 'spotify-sdk';

const persistedState = loadState()
const store = createStore(reducer,persistedState);

let client = Client.instance;
client.settings = {
    clientId: '9dd9df7b812f484c91490a594286ca76',
    secretId: 'af949b03d32045a19d5d4177dcb679b3',
    scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
    redirect_uri: 'http://localhost:8888/'
};
client.token = 'BQDydpXtSRrt3S3XqevTs4vle5XhEL9v2qyVSiNrbo6xGz0y_hBj18Tjo6vR___lOCNFb9RecPhe0vL0psIV7kPrBgzjHTGJnY_356R0eHh0iaOqEZ_di46ONjPpKSJaJU-M4MSMM06hM2DZGXH3gNW9CCLbltwoT7Jd64M7vA5SbHXpirHOC_w';
var track = new TrackHandler();

store.subscribe(throttle(()=>{
  saveState(store.getState());
}),1000)

fetch('http://localhost:8080/api/getsongs',{method:'GET'})
.then(response => response.json())
.then(data => {
  data.forEach(element => {  
    track.search(Object.values(element)[9], {limit: 1}).then((trackCollection) => {
      // LInk a cancion console.log(Object.values(trackCollection[0])[12]) 
      store.dispatch(actions.addSong({...element,
        image:Object.values(Object.values(Object.values(trackCollection[0])[0])[6][0])[1],
        song:Object.values(trackCollection[0])[12]
      }))
    });  
  });
})

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
