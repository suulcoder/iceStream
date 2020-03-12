import './styles.css';
import React from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import SignUp from '../SignUp';

const Header = ({app}) => (
        <div className="container">
            {
                (app===0) ? (
                    <SignUp></SignUp>
                ) : (
                    <div>  </div>
                )
            }
            <div></div>
        </div>
)

export default connect(
    state=>({
            app: selectors.getAppState(state),
        }),
    undefined
)(Header)