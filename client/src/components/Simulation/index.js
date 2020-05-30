import './styles.css';
import React, {Fragment, useState} from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import "react-datepicker/dist/react-datepicker.css";
import { setDays, setAction, setLodaer, setValidTracks, setDone } from '../../actions/simulation';
import simulateDay from '../../Utilities/simulation';
import {v4} from 'uuid'

const Simulation = ({
    isLoading,  actions,    topPlayed,  topSold, validTracks,
    validUsers, dailyPlays, dailySells, simulationState, onSubmit, done,
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
                                                <div className="done_"><strong >DONE</strong></div>
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
                                <div key={v4()} className="configuration_section">{action}</div>)
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
                    const request1 = new Request('http://localhost:8080/api/sim',{
                        method:'POST',
                        headers: { 'Content-Type':'application/json'},
                        body: JSON.stringify({playsByDay,salesByDay,limit,date})
                    })
                    fetch(request1)
                    .then(response => response.json())
                    .then(async(data1) => {
                        const simID = data1.rows[0].simulate
                        dispatch(setValidTracks(data.rows.map(track => [track.trackid,track.name])))
                        let daysToSet = parseInt(Date.parse(date)-Date.parse(d),10)/86400000
                        dispatch(setDays(daysToSet))
                        while (daysToSet+1>0) {
                            daysToSet--;
                            const actions = simulateDay(validTracks,validUsers,stateSim,salesByDay,playsByDay)
                            let counter = actions.length
                            actions.forEach(element => {
                                counter--;
                                const trackid = element.id
                                const userid = element.userid
                                const action = element.action
                                const request2 = new Request('http://localhost:8080/api/sim/line',{
                                    method:'POST',
                                    headers: { 'Content-Type':'application/json'},
                                    body: JSON.stringify({trackid,action,userid,simID})
                                })
                                fetch(request2)
                                .then(response => response.json())
                                .then(async(data2) => {
                                   dispatch(setAction(element))
                                   if(counter===0){
                                        dispatch(setDone(true))
                                   }
                                })
                                const purchaseRequest = new Request('http://localhost:8080/api/purchase', {
                                    method: 'post',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify(
                                        {
                                            'client': {
                                                'name': `${userid}`,
                                                'Info': 'ClientInfo'
                                            },
                                            'song': {
                                                'title': `${trackid}`,
                                                'Info': 'SongInfo'
                                            },
                                            'date': `${new Date()}`
                                        })
                                })
                                if(action === 'BUY'){
                                    fetch(purchaseRequest)
                                }
                            });
                        }
                        dispatch(setLodaer(false))
                    })
                })
            }
            else{
                alert('PICK A VALID DATE')
            }
        },
}))(Simulation)
