import './styles.css';
import React,{Fragment } from 'react';
import * as selectors from '../../reducers'
import Login from '../Login'
import { connect } from 'react-redux';
import Search from '../Search';
import * as actions from '../../actions/app';
import * as userActions from '../../actions/user'
import * as elementActions from '../../actions/elemnts'
import * as binnacleActions from '../../actions/binnacle'
import * as simulateActions from '../../actions/simulation'
import * as mongoActions from '../../actions/mongo'

const Header = ({app,role,onSubmit,logout,home,user,simulate,onBinnacle,onCart, onReport}) => (
        <Fragment>
            <div className="header">
                <div className="tittle">
                    <h1>
                        {'IceStream'}
                    </h1>
                </div>
                {
                    (app===0) ? (
                        <Login></Login>
                    ) : (
                        <div className="headerContainer">
                            {
                                (app===1 || app===2)?(
                                    <Search></Search>
                                ):(
                                    <Fragment></Fragment>
                                )
                            }
                            <div className="buttons">
                                {(app===1)?(
                                    (role==='admin')?(
                                        <Fragment>
                                            <button className="button" type="submit" onClick={
                                                () => onSubmit(role,app)
                                            }>
                                                {'ADMIN'}
                                            </button>
                                            <button className="button" type="submit" onClick={
                                                () => onBinnacle(role,app)
                                            }>
                                                {'BINNACLE'}
                                            </button>
                                            <button className="button" type="submit" onClick={
                                                () => simulate(role,app)
                                            }>
                                                {'SIMULATE'}
                                            </button>
                                            <button className='button' type='submit' onClick={
                                                () => onReport(role, app)
                                            }>
                                                {'GET REPORT'}
                                            </button>
                                        </Fragment>
                                    ):(
                                        <Fragment>
                                            <button className="button" type="submit" onClick={
                                                () => onSubmit(role,app)
                                            }>
                                                {'MY ICE'}
                                            </button>
                                            <button className="button" type="submit" onClick={
                                                () => onCart(role,app)
                                            }>
                                                {'CART'}
                                            </button>
                                        </Fragment>
                                    )
                                ):(
                                    <button className="button" type="submit" onClick={home}>
                                        {'HOME'}
                                    </button>
                                )}
                                <button className="button" type="submit" onClick={()=>logout(user)}>
                                    {'LOG OUT'}
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="empty"></div>
            <div className="bar"></div>
        </Fragment>
)

export default connect(
    state=>({
            app: selectors.getAppState(state),
            role: (selectors.getUser(state)!=null)?selectors.getUser(state)[Object.keys(selectors.getUser(state))[1]]:null,
            user: (selectors.getUser(state)!=null)?selectors.getUser(state).username:null
        }),
    dispatch=>({
        onSubmit(role){
            switch (role){
                case 'admin':
                    fetch('http://localhost:8080/api/user',{method:'GET'})
                    .then(response => response.json())
                    .then(data => {
                        const myData = []
                        data.forEach(element => {
                            myData.push([element.userid,element.username])
                            dispatch(userActions.addUser(element))
                        });
                    }) 
                    dispatch(actions.changeState(4))
                    break;
                case 'client':
                    dispatch(actions.changeState(3))
                    break;
                default:
                    break;
            }
        },
        logout(user){
            const request1 = new Request('http://localhost:8080/api/logout',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({user:user})
            })
            fetch(request1)
            .then(async(response)=>{    
                dispatch(actions.changeState(0))
                dispatch(elementActions.selectElement(null))
                dispatch(elementActions.editElement(null))
                dispatch(userActions.setUsertoNull())
                dispatch(userActions.set_Bought_to_null())
                dispatch(simulateActions.setNull())
                localStorage.clear();
            })
        },
        home(){
            dispatch(binnacleActions.toNull())
            dispatch(actions.changeState(1))
            dispatch(simulateActions.setNull())
            dispatch(simulateActions.setDone(false))
        },
        onBinnacle(){
            fetch('http://localhost:8080/api/binnacle',{method:'GET'})
            .then(response => response.json())
            .then(data => {
                data.forEach(id=>{
                    dispatch(binnacleActions.add({...id}))
                })
                dispatch(actions.changeState(5))
                dispatch(elementActions.selectElement(null))
            })
        },
        simulate(){
            dispatch(simulateActions.setLodaer(true))
            dispatch(elementActions.selectElement(null))
            dispatch(actions.changeState(6))
            fetch('http://localhost:8080/api/customer',{method:'GET'})
            .then(response => response.json())
            .then(data => {
                dispatch(simulateActions.setValidUsers(data.map(element=>[element.customerid,element.firstname])))
                data.forEach(element=>{
                    const request1 = new Request('http://localhost:8080/api/boughtTracks',{
                        method:'POST',
                        headers: { 'Content-Type':'application/json'},
                        body: JSON.stringify({customerid:element.customerid})
                    })
                    fetch(request1)
                    .then(response => response.json())
                    .then(data1 => {
                        dispatch(simulateActions.setState({userid: element.customerid, bought: data1.rows.map(el => el.trackid)}))
                        dispatch(simulateActions.setLodaer(false))
                    })
                })
            }) 
        },
        onCart(){
            dispatch(actions.changeState(7))
            dispatch(elementActions.selectElement(null))
        },
        onReport(){
            const getLatestRequest = new Request('http://localhost:8080/api/getLatest', {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
            fetch(getLatestRequest).then(response => response.json().then(data => {dispatch(mongoActions.fetchMongo(data.result))}))
            dispatch(actions.changeState(8))
        }
    })
)(Header)