import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';

const Binnacle = ({data}) => (
    <div className="binnacle">
        <div className="cart_tittle">Binnacle</div>
        {data.length!==0?(
            <Fragment>
                {data.map(
                    action => (
                        <div className="bought">
                            <strong>{`${action.indate}:    `}</strong>
                            <div className="text">{`  @${action.username} ACCOMPLISHED ACTION OF TYPE '${action.action}' ON ${action.element} WITH ID ${action.id}`}</div>
                        </div>
                    ))}
            </Fragment>
        ):(
            <div className="message__">{'NO DATA AVAILABLE'}</div>
            )
        }
    </div>
    
)

export default connect(
    (state)=>({
            data: selectors.getBinnacle(state)
        }),
    undefined
)(Binnacle)
