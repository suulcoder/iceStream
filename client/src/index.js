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
import {devToolsEnhancer} from "redux-devtools-extension";
import * as selectors from './reducers'

//localStorage.clear();
const persistedState = loadState()
const store = createStore(reducer,persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace:true}));

store.subscribe(throttle(()=>{
    console.log(store.getState())
  saveState(store.getState());
}),1000)

const App = () => (
  <Provider store={store}>
      <Router>
        <Route path="/" component={AppState}/>
      </Router>
  </Provider>
);

const purchaseRequest = (user, song, date) => {
    const userRequest = new Request('http://localhost:8080/api/checkusername',{
        method:'post',
        headers: { 'Content-Type':'application/json'},
        body:JSON.stringify(
            {
                'Username':`${user}`
            })
    })

    fetch(userRequest).then(async (response)=>{
        response.json().then(value => {
            const purchaseRequest = new Request('http://localhost:8080/api/purchase',{
                method:'post',
                headers: { 'Content-Type':'application/json'},
                body:JSON.stringify(
                    {
                        'client':{
                            'name':`${value.rows[0].username}`,
                            'Info':'ClientInfo'
                        },
                        'song':{
                            'title':`${song}`,
                            'Info':'SongInfo'
                        },
                        'date':`${date}`
                    })
            })
            fetch(purchaseRequest).then(async (response)=>{
                response.json().then(
                    value1 => {
                        console.log(value1)
                    }
                )
                }
            )
        })
    })
    /*fetch(purchaseRequest).then(async function test(response) {
        /!*response.json().then(value => console.log(value))*!/
        console.log(.then(value => console.log(value)))
        console.log('yay')
    })*/

    /*getCurrentUserInfo(user)*/
};

const getPurchasesByDate = (date) =>{
    const getRequest = new Request('http://localhost:8080/api/lookup',{
        method:'post',
        headers: { 'Content-Type':'application/json'},
        body:JSON.stringify(
            {
                'date':`${date}`
            })
    })
    fetch(getRequest).then(async function test(response) {
        console.log(response.json().then(value => console.log(value)))
        console.log('yay')
    })
}

const getLatestPurchases = () =>{
    const getLatestRequest = new Request('http://localhost:8080/api/getLatest',{
        method:'get',
        headers: { 'Content-Type':'application/json'}
    })
    fetch(getLatestRequest).then(async function test(response) {
        console.log(response.json().then(value => console.log(value)))
        console.log('yay')
    })
}

const getCurrentUserInfo = (user) =>{
    const request1 = new Request('http://localhost:8080/api/checkusername',{
        method:'post',
        headers: { 'Content-Type':'application/json'},
        body:JSON.stringify(
            {
                'Username':'admin'
            })
    })

    fetch(request1).then(async function test(response) {
        console.log(response.json().then(value => console.log(value.rows)))
        console.log('yay')
    })
}


ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
