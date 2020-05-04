import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import SignUp from '../SignUp';
import Report from '../Report';
import Elements from '../Elements';
import Admin from '../Admin';
import SearchElements from '../SearchElements';
import MyIce from '../MyIce';
import Cart from '../Cart';

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
                        (app===2)?(
                            <SearchElements></SearchElements>
                        ):(
                            (app===3)?(
                                <MyIce></MyIce>
                            ):(
                                (app===4)?(
                                    <Admin></Admin>
                                ):(
                                    (app===5)?(
                                        <Fragment></Fragment>
                                    ):(
                                        (app===6)?(
                                            <Fragment></Fragment>
                                        ):(
                                            <Cart></Cart>
                                        )
                                )
                            )
                        ))
                    )
                    
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