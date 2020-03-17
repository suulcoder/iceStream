import './styles.css';
import React,{Fragment } from 'react';
import * as selectors from '../../reducers'
import Login from '../Login'
import { connect } from 'react-redux';
import Search from '../Search';
import * as actions from '../../actions/app';
import * as userActions from '../../actions/user'
import * as elementActions from '../../actions/elemnts'

const Header = ({app,role,onSubmit,logout,home}) => (
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
                            <Search></Search>
                            <div className="buttons">
                                {(app===1)?(
                                    <button className="button" type="submit" onClick={
                                        () => onSubmit(role,app)
                                    }>
                                        {(role==='admin')?'ADMIN':'myIce'}
                                    </button>
                                ):(
                                    <button className="button" type="submit" onClick={home}>
                                        {'HOME'}
                                    </button>
                                )}
                                <button className="button" type="submit" onClick={logout}>
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
            role: (selectors.getUser(state)!=null)?selectors.getUser(state)[Object.keys(selectors.getUser(state))[1]]:null
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
        logout(){
            dispatch(userActions.setUsertoNull())
            dispatch(actions.changeState(0))
            dispatch(elementActions.selectElement(null))
            dispatch(elementActions.editElement(null))
        },
        home(){
            dispatch(actions.changeState(1))
        }
    })
)(Header)