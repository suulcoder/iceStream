import './styles.css';
import React,{Fragment } from 'react';
import * as selectors from '../../reducers'
import Login from '../Login'
import { connect } from 'react-redux';
import Search from '../Search';
import * as actions from '../../actions/app';
import * as userActions from '../../actions/user'
import * as elementActions from '../../actions/elemnts'

const Header = ({app,role,onSubmit,logout,home,user,simulate,onBinnacle,onCart}) => (
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
                        data.forEach(element => {
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
                localStorage.clear();
            })
        },
        home(){
            dispatch(actions.changeState(1))
        },
        onBinnacle(){
            dispatch(actions.changeState(5))
            dispatch(elementActions.selectElement(null))
        },
        simulate(){
            dispatch(actions.changeState(6))
            dispatch(elementActions.selectElement(null))
        },
        onCart(){
            dispatch(actions.changeState(7))
            dispatch(elementActions.selectElement(null))
        }
    })
)(Header)