import './styles.css';
import React, {Fragment, useState} from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import "react-datepicker/dist/react-datepicker.css";
import { setDays, setAction, setLodaer, setValidTracks, setDone, setNull } from '../../actions/simulation';
import simulateDay from '../../Utilities/simulation';
import { changeState } from '../../actions/app';

const Simulation = ({
    isLoading,  actions,    topPlayed,  topSold,         topInteractions, validTracks,
    validUsers, dailyPlays, dailySells, simulationState, onSubmit, done, restart
}) => {
    const [date,changeDate] = useState('')
    const [dailyP,changePlays] = useState(dailyPlays)
    const [dailyS,changeSales] = useState(dailySells)
    const [limit,changeLimit] = useState(20)
    return (
        <div className='myIce'>
            <div className="addMyIce">
                <div className="addMyIce_">
                    <div className="tittle">
                        <strong>Simulate with IceStream:</strong>
                        <div className="configuration">
                            {
                                (isLoading)?<Spinner/>:(
                                    <div className="configuration_"> 
                                        <div className="configuration">
                                            <div>
                                                <div className="configuration_section">End Date:</div>
                                                <input
                                                    type="date"
                                                    value={date}
                                                    className="user"
                                                    onChange={e=>changeDate(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <div className="configuration_section">Daily Plays:</div>
                                                <input
                                                    type="number"
                                                    value={dailyP}
                                                    className="user"
                                                    min={1}
                                                    onChange={e=>changePlays(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <div className="configuration_section">Daily Sales:</div>
                                                <input
                                                    type="number"
                                                    value={dailyS}
                                                    className="user"
                                                    min={1}
                                                    onChange={e=>changeSales(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                            <div className="configuration_section">Number of tracks:</div>
                                            <input
                                                type="number"
                                                value={limit}
                                                className="user"
                                                min={1}
                                                onChange={e=>changeLimit(e.target.value)}
                                            />
                                        </div>
                                        </div>
                                        {
                                            !done?(
                                                <button className="login_button" type="submit" onClick={
                                                    () => onSubmit(validTracks, validUsers, simulationState, dailyS, dailyP,date,limit)
                                                }>
                                                    {'START SIMULATION'}
                                                </button>  
                                            ):(
                                                <button className="login_button" type="submit" onClick={
                                                    () => restart()
                                                }>
                                                    {'HOME'}
                                                </button>  
                                            )
                                        }
                                              
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="GrayBar">
                </div>
                <div className="myPermissions" >
                    <div className="myPermissions_">History:</div>
                        {
                            actions.map(action=>
                                <div key={action} className="configuration_section">{action}</div>)
                        }
                </div>
            </div>
            </div>
            <div className="myPermissions" >
                <div className="myPermissions_"><strong>Track with more plays:</strong></div>
                {
                    (topPlayed)?(
                        <Fragment>
                            <div className="configuration_section">{topPlayed.name}</div>
                            <div className="GrayBar"></div>
                            <img alt='' src={topPlayed.image} className="image_"></img>
                        </Fragment>
                    ):(<div className="configuration_section">NO DATA AVAILABLE</div>)
                }
                <div className="myPermissions_"><strong>Track with more sales:</strong></div>
                {
                    (topSold)?(
                        <Fragment>
                            <div className="configuration_section">{topSold.name}</div>
                            <div className="GrayBar"></div>
                            <img alt='' src={topSold.image} className="image_"></img>
                        </Fragment>
                    ):(<div className="configuration_section">NO DATA AVAILABLE</div>)
                }
            </div>
        </div>
    )
}

export default connect(
    state=> ({
        isLoading: selectors.getLoader(state),
        actions: selectors.getActions(state),
        topPlayed: selectors.getTopPlayed(state)?selectors.getElement(state,selectors.getTopPlayed(state)):null,
        topSold: selectors.getTopSelled(state)? selectors.getElement(state,selectors.getTopSelled(state)):null,
        topInteractions: '@ '+ selectors.getTopInteraction(state),
        validTracks: selectors.getValidTracks(state),
        validUsers: selectors.getValidUsers(state),
        dailyPlays: selectors.getDailyPlays(state),
        dailySells: selectors.getDailySells(state),
        simulationState: selectors.getSimulationState(state),
        done: selectors.getDone(state)
    }),
    dispatch => ({
        onSubmit(validTracks, validUsers, stateSim, salesByDay, playsByDay,date,limit){
            let dt = new Date()
            const d = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
            if(Date.parse(date)-Date.parse(d)>0 && limit>0 && salesByDay>0 && playsByDay>0){
                dispatch(setLodaer(true))
                const request = new Request('http://localhost:8080/api/tracks',{
                    method:'POST',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify({limit})
                })
                fetch(request)
                .then(response => response.json())
                .then(async(data) => {
                    dispatch(setValidTracks(data.rows.map(track => [track.trackid,track.name])))
                    let daysToSet = parseInt(Date.parse(date)-Date.parse(d),10)/86400000
                    dispatch(setDays(daysToSet))
                    while (daysToSet+1>0) {
                        daysToSet--;
                        const actions = simulateDay(validTracks,validUsers,stateSim,salesByDay,playsByDay)
                        actions.forEach(element => {
                            dispatch(setAction(element))
                        });
                    }
                    dispatch(setLodaer(false))
                    dispatch(setDone(true))
                })
            }
            else{
                alert('PICK A VALID DATE')
            }
        },
        restart(){
            dispatch(setNull())
            dispatch(setDone(false))
            dispatch(changeState(1))
        }
}))(Simulation)
