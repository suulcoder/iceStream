import './styles.css';
import React from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import SignUp from '../SignUp';
import Report from '../Report';

const Header = ({app}) => (
        <div className="container">
            {
                (app===0) ? (
                    <SignUp></SignUp>
                ) : (
                    (app===1)?(
                        <Report></Report>
                    ):(
                        <div>  </div>
                    )
                    
                )
            }
            <div></div>
        </div>
)

export default connect(
    state=>{
        console.log(state)
        return ({
            app: selectors.getAppState(state),
        })
    },
    undefined
)(Header)