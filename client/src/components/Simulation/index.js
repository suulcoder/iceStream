import './styles.css';
import React, {Fragment, useState} from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Spinner from '../Spinner';

const Simulation = ({
    isLoading,  actions,    topPlayed,  topSold, topInteractions,validTracks,
    validUsers, dailyPlays, dailySells, simulationState
}) => {
    return (
        <div className='myIce'>
            <div className="addMyIce">
                <div className="addMyIce_">
                    <div className="tittle">
                        <strong>Simulate with IceStream:</strong>
                        {
                            (isLoading)?<Spinner/>:<Fragment/>
                        }
                    </div>
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
        topSold: selectors.getElement(state,selectors.getTopSelled(state)),
        topInteractions: selectors.getUsers(state,selectors.getTopInteraction(state)),
        validTracks: selectors.getValidTracks(state),
        validUsers: selectors.getValidUsers(state),
        dailyPlays: selectors.getDailyPlays(state),
        dailySells: selectors.getDailySells(state),
        simulationState: selectors.getSimulationState(state)
    }),
    dispatch => ({
        
}))(Simulation)
