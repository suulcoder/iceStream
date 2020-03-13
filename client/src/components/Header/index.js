import './styles.css';
import React,{Fragment } from 'react';
import * as selectors from '../../reducers'
import Login from '../Login'
import { connect } from 'react-redux';
import Search from '../Search';
import * as actions from '../../actions/app';
import * as userActions from '../../actions/user'

const Header = ({app,role,onSubmit,logout}) => (
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
                                <button className='button' type="submit" onClick={onSubmit(role)}>
                                                {(role==='admin')?'ADMIN':'myIce'}
                                            </button>
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
    state=>{
        console.log(state)
        return({
            app: selectors.getAppState(state),
            role: (selectors.getUser(state)!=null)?selectors.getUser(state)[Object.keys(selectors.getUser(state))[1]]:null
        })
    },
    dispatch=>({
        onSubmit(role){
            switch (role){
                case 'admin':
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
        }
    })
)(Header)