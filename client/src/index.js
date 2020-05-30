import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import './styles.css';
import {Provider} from 'react-redux';
import AppState from './components/AppState'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import reducer from './reducers';
import {loadState, saveState} from './localStorage'
import throttle from 'lodash/throttle'
import {devToolsEnhancer} from "redux-devtools-extension";
import * as selectors from './reducers'

//localStorage.clear();
const persistedState = loadState()
const store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace: true}));

store.subscribe(throttle(() => {
    /*console.log(store.getState())*/
    saveState(store.getState());
}), 1000)

const App = () => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={AppState}/>
        </Router>
    </Provider>
);


ReactDOM.render(
    <App/>,
    document.getElementById('root'),
);
