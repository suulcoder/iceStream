import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/report';
import * as selectors from '../../reducers'


const Report = ({index,forward,backward}) =>(
    <div className="report">
        <button className="reportbutton" onClick={backward}>
            {'<'}
        </button>
        {
            (index===0)?(
                <div></div>
            ):(
                <div/>
            )
        }
        <button className="reportbutton" onClick={forward}>
            {'>'}
        </button>

    </div>
)

export default connect(
    state => ({
        index: selectors.getReport(state)
    }),
    dispatch =>({
        forward(){
            dispatch(actions.changeReport())
        },
        backward(){
            dispatch(actions.changeReportDown())
        }
    })
)(Report)


