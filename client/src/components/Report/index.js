import React from 'react';
import { connect } from 'react-redux';
import slice from 'lodash/slice'

import { Bar, Pie, HorizontalBar } from 'react-chartjs-2';

import './styles.css';
import * as actions from '../../actions/report';
import * as selectors from '../../reducers'
import * as types from '../../types/reportSections';
import * as functions from '../../Utilities/index';


const Report = ({ index, info1, info2, info3, info4, info5, info6, info7, info8, forward, backward }) =>(
    <div className="report">
        <button className="reportbutton" onClick={backward}>
            {'<'}
        </button>
        {
            (index === 0) ? 
                <div className="report__info1">
                    {info1[0] === undefined ? ' ' : <HorizontalBar data={
                                {
                                    labels: [info1[0].name, info1[1].name, info1[2].name, info1[3].name, info1[4].name],
                                    datasets:[{
                                        label: 'Álbumes',
                                        backgroundColor:[
                                            'rgba(255, 99, 132, 0.6)',
                                            'rgba(54, 162, 235, 0.6)',
                                            'rgba(255, 100, 86, 0.6)',
                                            'rgba(75, 192, 192, 0.6)',
                                            'rgba(153, 102, 255, 0.6)',
                                        ],
                                        fontColor: 'white',
                                        fontSize: 30,
                                        data: [info1[0].count, info1[1].count, info1[2].count, info1[3].count, info1[4].count],
                                    }]
                                }
                            } options={{
                                title: {
                                    fontColor: 'white',
                                    display: true,
                                    text: 'Top 5 Artistas con Más Álbumes',
                                    fontSize: 30,
                                },
                                legend:{
                                    labels:{
                                        fontColor: 'white',
                                        fontSize: 16,
                                    }
                                },
                                scales: {
                                    xAxes: [{
                                        ticks: {
                                            stepSize: 1,
                                            beginAtZero: true,
                                            fontColor: 'white',
                                            fontSize: 16,
                                        }   
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            fontColor: 'white',
                                            fontSize: 24,
                                        }
                                    }]
                                }
                            }}height={500} width={950}/>}
                </div>
                : 
                (index === 1) ? 
                    <div className="report__info2">
                        {info2 === undefined ? ' ' : <Bar data={
                            {
                                labels: info2.map( genre => genre.name),
                                datasets: [{
                                        fontColor: 'rgb(255, 255, 255)',
                                        fontSize: 30,
                                        label: 'Duracion Promedio',
                                        data: info2.map( genre => (genre.avg / 60000).toFixed(2)),
                                        hoverBackgroundColor: 'rgb(168, 129, 13)',
                                        borderColor: 'white',
                                        backgroundColor: 'rgb(218, 169, 22)',
                                    }]
                            } 
                        } options={{
                            title: {
                                fullWidth: true,
                                fontColor: 'white',
                                display: true,
                                text: 'Promedio de Duración de Canciones por Género',
                                fontSize: 30,
                            },
                            legend:{
                                labels:{
                                    fontColor: 'white',
                                    fontSize: 16,
                                }
                            },
                            scales: {
                                xAxes:[{
                                    ticks: {
                                        fontColor: 'white',
                                        fontSize: 16,
                                    }
                                }],
                                yAxes:[{
                                    ticks: {
                                        fontColor: 'white',
                                        fontSize: 16,
                                        callback: function(label, index, labels) {
                                            return label + ':00'
                                        }
                                    }
                                }]
                            }
                        }} width={1000} height={500}/>}
                    </div> 
                    : 
                    (index === 2) ? 
                        <div className="report__info3">
                            {info3 === undefined ? ' ' : <Pie data={
                                {
                                    labels: [info3[0].name, info3[1].name, info3[2].name, info3[3].name, info3[4].name],
                                    datasets:[{
                                        backgroundColor:[
                                            'rgba(255, 99, 132, 0.6)',
                                            'rgba(54, 162, 235, 0.6)',
                                            'rgba(255, 100, 86, 0.6)',
                                            'rgba(75, 192, 192, 0.6)',
                                            'rgba(153, 102, 255, 0.6)',
                                        ],
                                        fontColor: 'white',
                                        fontSize: 30,
                                        data: [info3[0].count, info3[1].count, info3[2].count, info3[3].count, info3[4].count],
                                    }]
                                }
                            } options={{
                                title: {
                                    fontColor: 'white',
                                    display: true,
                                    text: 'Top 5 Géneros con Más Canciones',
                                    fontSize: 30,
                                },
                                legend:{
                                    labels:{
                                        fontColor: 'white',
                                        fontSize: 16,
                                    }
                                },
                            }}height={500} width={600}/>}
                        </div>
                    :
                    (index === 3) ?
                        <div className="report__info4">
                            {info4 === undefined ? ' ' : <HorizontalBar data={
                                {
                                    labels: info4.map(song => song.aname + ' - ' + song.name),
                                    datasets: [{
                                        label: 'Duración',
                                        data: info4.map(song => (song.milliseconds / 60000).toFixed(2)),
                                        fontColor: 'white',
                                        fontSize: 30,
                                        backgroundColor: 'rgb(218, 169, 22)',
                                    }]
                                }
                            } options={{
                                title: {
                                    fontColor: 'white',
                                    display: true,
                                    text: 'Top 5 Canciones Más Largas',
                                    fontSize: 36,
                                },
                                legend:{
                                    labels:{
                                        fontColor: 'white',
                                        fontSize: 24,
                                    }
                                },
                                scales: {
                                    xAxes:[{
                                        ticks: {
                                            fontColor: 'white',
                                            fontSize: 16,
                                            callback: function(label, index, labels) {
                                                return label + ":00"
                                            }
                                        }
                                    }],
                                    yAxes:[{
                                        ticks: {
                                            fontColor: 'white',
                                            fontSize: 20,
                                        }
                                    }]
                                }
                            }
                            }width={1200} height={500}
                            />}
                        </div>
                    :
                    (index === 4) ?
                        <div>
                            {info5 === undefined ? 'TOP ARTISTAS CON MÁS GÉNEROS' : <Bar data={{
                                    labels: info5.map(artist => artist.name),
                                    datasets:[{
                                        label: 'Géneros',
                                        backgroundColor:[
                                            'rgb(128, 0, 255)',
                                            'rgb(128, 120, 255)',
                                            'rgb(128, 240, 255)',
                                            'rgb(191, 0, 255)',
                                            'rgb(255, 0, 255)',
                                        ],
                                        fontColor: 'white',
                                        fontSize: 30,
                                        data: info5.map(artist => artist.count),
                                    }]
                                }
                            } options={{
                                title: {
                                    fontColor: 'white',
                                    display: true,
                                    text: 'Top 5 Artistas Con Más Géneros',
                                    fontSize: 30,
                                },
                                legend:{
                                    labels:{
                                        fontColor: 'white',
                                        fontSize: 16,
                                    }
                                },
                                scales:{
                                    yAxes:[{
                                        ticks: {
                                            stepSize: 1,
                                            beginAtZero: true,
                                            fontSize: 16,
                                            fontColor: 'white',
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            fontSize: 16,
                                            fontColor: 'white',
                                        }
                                    }]
                                }
                            }} height={500} width={600}/>}
                        </div>
                    :
                    (index === 5) ? 
                        <div className="report__info6">
                            {info6 === undefined ? ' ' :
                                <div className="report__info6">
                                    <h1>{'Artistas Por Playlist'}</h1>
                                    <div className="info__container">
                                        {info6.map(playlist =>
<<<<<<< HEAD
                                            <div key={playlist.name} className="info_">{playlist.name}<div>{playlist.count + (playlist.count > 1 ? ' artistas' : ' artista')}</div></div>
=======
                                            <div key={playlist.name}>{playlist.name}<div key={playlist.name + playlist.count}>{playlist.count + (playlist.count > 1 ? ' artistas' : ' artista')}</div></div>
>>>>>>> b05636bda568946c80ac7e6911bba98830d8621b
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    :
                    (index === 6) ? 
                        <div>
                            {info7 === undefined ? ' ' : <Bar data={{
                                labels: info7.map(object => object.username),
                                datasets:[{
                                    label: 'Canciones Agregadas',
                                    backgroundColor:[
                                        'rgb(255, 128, 60)',
                                        'rgb(255, 128, 90)',
                                        'rgb(255, 128, 120)',
                                        'rgb(255, 128, 150)',
                                        'rgb(255, 128, 180)',
                                        'rgb(255, 128, 210)',
                                    ],
                                    fontColor: 'white',
                                    fontSize: 30,
                                    data: info7.map(object => object.count)
                                }]
                            }} options={{
                                title: {
                                    fontColor: 'white',
                                    display: true,
                                    text: 'Top 5 Usuarios con Más Canciones Agregadas',
                                    fontSize: 36,
                                },
                                legend:{
                                    labels:{
                                        fontColor: 'white',
                                        fontSize: 24,
                                    }
                                },
                                scales: {
                                    xAxes:[{
                                        ticks: {
                                            fontColor: 'white',
                                            fontSize: 16,
                                        }
                                    }],
                                    yAxes:[{
                                        ticks: {
                                            beginAtZero: true,
                                            stepSize: 2,
                                            fontColor: 'white',
                                            fontSize: 20,
                                        }
                                    }]
                                }
                            }} height={500} width={800} />}
                        </div>
                    :
                    (index === 7) ? 
                        <div>
                            {info8[0] === undefined ? ' ' : 
                                <div className="report__info6">
                                    <h1>{'Duración Total por Playlist (DD:HH:MM)'}</h1>
                                    <div className="info__container">
                                        {info8.map(playlist =>
<<<<<<< HEAD
                                            <div key={playlist.name} className="info_">{playlist.name}<div>{functions.MStoTIME(playlist.duration)}</div></div>
=======
                                            <div key={playlist.name}>{playlist.name}<div key={playlist.name + playlist.duration}>{functions.MStoTIME(playlist.duration)}</div></div>
>>>>>>> b05636bda568946c80ac7e6911bba98830d8621b
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    :
                    <div>

                    </div>
        }
        <button className="reportbutton" onClick={() => forward(info8)}>
            {'>'}
        </button>

    </div>
)

export default connect(
    state => ({
        index: selectors.getReport(state),
        info1: selectors.getReportSection(state, types.GET_ARTIST_WITH_MORE_ALBUMS),
        info2: selectors.getReportSection(state, types.GET_GENRE_BY_DURATION),
        info3: selectors.getReportSection(state, types.GET_GENRE_WITH_MORE_SONGS),
        info4: slice(selectors.getReportSection(state, types.GET_LONGEST_SONG), 0, 5),
        info5: selectors.getReportSection(state, types.GET_ARTIST_BY_GENRE_COUNT),
        info6: selectors.getReportSection(state, types.GET_PLAYLIST_BY_ARTIST_COUNT),
        info7: slice(selectors.getReportSection(state, types.GET_USERS_WITH_MORE_TRACK_ADDED), 0, 5),
        info8: selectors.getReportSection(state, types.GET_PLAYLIST_BY_DURATION),
    }),
    dispatch =>({
        forward(info6){
            console.log(info6)
            dispatch(actions.changeReport())
        },
        backward(){
            dispatch(actions.changeReportDown())
        }
    })
)(Report)
