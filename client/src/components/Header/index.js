import './styles.css';
import React,{Fragment , useState } from 'react';
import * as selectors from '../../reducers'
import Login from '../Login'
import { connect } from 'react-redux';

const Header = ({app,onSubmit}) => (
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
                        <div></div>
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
            app: selectors.getAppState(state)
        })
    },
    undefined
)(Header)