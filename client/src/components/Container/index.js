import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import SignUp from '../SignUp';
import Report from '../Report';
import Elements from '../Elements';
import Admin from '../Admin';
import SearchElements from '../SearchElements';

const Header = ({app}) => (
        <div className="container">
            {
                (app===0) ? (
                    <SignUp></SignUp>
                ) : (
                    (app===1)?(
                        <Fragment>
                            <Report></Report>
                            <Elements></Elements>
                        </Fragment>
                    ):(
                        (app==2)?(
                            <SearchElements></SearchElements>
                        ):((app==3)?(
                            <div></div>
                        ):(
                            <Admin></Admin>
                        ))
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