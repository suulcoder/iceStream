import './styles.css';
import React, {Fragment, useState} from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import { getTopSelled } from '../../reducers/simulation';

const MyIce = ({}) => {
    return (
        <div className='myIce'>
            <div className="addMyIce">
                <div className="addMyIce_">
                    <strong>Simulate with IceStream:</strong>
                    <div className="GrayBar">
                </div>
                <div className="myPermissions" >
                    <div className="myPermissions_">History:</div>
            </div>
            </div>
            </div>
            <div className="myPermissions" >
                <div className="myPermissions_"><strong>Track with more plays:</strong></div>
                <div className="myPermissions_"><strong>Track with more sales:</strong></div>
                <div className="myPermissions_"><strong>User with more interactions:</strong></div>
            </div>
        </div>
    )
}

export default connect(
    state=> ({
        isLoading: selectors.getLoader(state),
        actions: selectors.getActions(state),
        topPlayed: selectors.getElement(state,selectors.getTopPlayed(state)),
        topSold: selectors.getElement(state,getTopSelled(state)),
        topInteractions: selectors.getUsers(state,selectors.getTopInteraction(state)),
        validTracks: selectors.getValidTracks(state),
        validUsers: selectors.getValidUsers(state),
        dailyPlays: selectors.getDailyPlays(state),
        dailySells: selectors.getDailySells(state),
        simulationState: selectors.getSimulationState(state)
    }),
    dispatch => ({
        
}))(MyIce)
