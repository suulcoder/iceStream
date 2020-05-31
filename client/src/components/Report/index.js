import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Bar, Pie, HorizontalBar } from 'react-chartjs-2';
import { CSVLink } from 'react-csv';
import slice from 'lodash/slice';

import './styles.css';
import * as actions from '../../actions/report';
import * as selectors from '../../reducers'
import * as types from '../../types/reportSections';
import * as functions from '../../Utilities/index';

const prettyLink  = {
    backgroundColor: 'rgb(255, 191, 0)',
    fontSize: 20,
    fontWeight: 700,
    height: 52,
    padding: '4px 48px',
    borderRadius: 5,
    color: '#ffffff'
};

const Report = ({ index, info1, info2, info3, info4, info5, info6, info7, info8, info9, info10, info11, info12, forward, backward, onSubmitWeeklySales, onSubmitMostSoldArtists, onSubmitMostSoldGenres, onSubmitArtistReproductions, weeklySalesExtras , mostSoldArtistsExtras, mostSoldGenresExtras }) => {

    const [initialDate, changeInitialDate] = useState('')
    const [finishDate, changeFinishDate] = useState('')
    const [artistName, changeArtistName] = useState('')
    const [n, changeN] = useState(0)

    return (
        <div className="report">
            <button className="reportbutton" onClick={() => backward(changeArtistName, changeFinishDate, changeInitialDate, changeN)}>
                {'<'}
            </button>
            {
                (index === 0) ? 
                    <div className="report__info__and__download">
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
                        <span className="download-text">
                            Clic acá para descargar reporte <CSVLink data={
                                info1.map(row => ({name: row.name, count: parseInt(row.count)}))
                                } headers={[{label: 'Nombre del artista', key: 'name'}, {label: 'Número de Álbumes', key: 'count'}]} 
                                style={prettyLink}
                                filename="artistas_con_mas_albumes.csv">CSV ⬇</CSVLink>
                        </span>
                    </div>
                    : 
                    (index === 1) ? 
                        <div className="report__info__and__download">
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
                            <span className="download-text">
                            Clic acá para descargar reporte <CSVLink data={
                                info2.map(row => ({genre: row.name, avg: functions.millisToMinutesAndSeconds(row.avg)}))
                                } headers={[{label: 'Género', key: 'genre'}, {label: 'Duración promedio', key: 'avg'}]} 
                                style={prettyLink}
                                filename="duracion_promedio_por_genero.csv">CSV ⬇</CSVLink>
                            </span>
                        </div>
                        : 
                        (index === 2) ? 
                            <div className="report__info__and__download">
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
                                <span className="download-text">
                                    Clic acá para descargar reporte <CSVLink data={
                                        info3.map(row => ({genre: row.name, count: row.count}))
                                    } headers={[{label: 'Género', key: 'genre'}, {label: 'Número de canciones', key: 'count'}]} 
                                    style={prettyLink}
                                    filename="generos_con_mas_canciones.csv">CSV ⬇</CSVLink>
                                </span>
                            </div>
                        :
                        (index === 3) ?
                            <div className="report__info__and__download">
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
                                <span className="download-text">
                                    Clic acá para descargar reporte <CSVLink data={
                                        info4.map(row => ({artist: row.aname, song: row.name, long: functions.millisToMinutesAndSeconds(row.milliseconds)}))
                                    } headers={[{label: 'Artista', key: 'artist'}, {label: 'Canción', key: 'song'}, {label: 'Duración', key: 'long'}]} 
                                    style={prettyLink}
                                    filename="canciones_mas_largas.csv">CSV ⬇</CSVLink>
                                </span>
                            </div>
                        :
                        (index === 4) ?
                            <div className="report__info__and__download">
                                <div>
                                    {info5 === undefined ? ' ' : <Bar data={{
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
                                <span className="download-text">
                                    Clic acá para descargar reporte <CSVLink data={
                                        info5.map(row => ({artist: row.name, genres: row.count}))
                                    } headers={[{label: 'Nombre del Artista', key: 'artist'}, {label: 'Número de Géneros', key: 'genres'}]} 
                                    style={prettyLink}
                                    filename="artistas_con_mas_generos.csv">CSV ⬇</CSVLink>
                                </span>
                            </div>
                        :
                        (index === 5) ? 
                            <div className="report__info__and__download">
                                <div className="report__info6">
                                    {info6 === undefined ? ' ' :
                                        <div className="report__info6">
                                            <h1>{'Artistas Por Playlist'}</h1>
                                            <div className="info__container">
                                                {info6.map(playlist =>
                                                    <div key={playlist.name} className="info_">{playlist.name}<div>{playlist.count + (playlist.count > 1 ? ' artistas' : ' artista')}</div></div>
                                                )}
                                            </div>
                                        </div>
                                    }
                                </div>
                                <span className="download-text">
                                    Clic acá para descargar reporte <CSVLink data={
                                        info6.map(row => ({playlist: row.name, artists: row.count}))
                                    } headers={[{label: 'Nombre de Playlist', key: 'playlist'}, {label: 'Número de Artistas', key: 'artists'}]} 
                                    style={prettyLink}
                                    filename="artistas_por_playlist.csv">CSV ⬇</CSVLink>
                                </span>
                            </div>
                        :
                        (index === 6) ? 
                            <div className="report__info__and__download">
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
                                <span className="download-text">
                                    Clic acá para descargar reporte <CSVLink data={
                                        info7.map(row => ({user: row.username, count: row.count}))
                                    } headers={[{label: 'Nombre de Usuario', key: 'user'}, {label: 'Canciones agregadas', key: 'count'}]} 
                                    style={prettyLink}
                                    filename="usuarios_con_mas_canciones_agregadas.csv">CSV ⬇</CSVLink>
                                </span>
                            </div>
                        :
                        (index === 7) ? 
                            <div className="report__info__and__download">
                                <div className="report__info6">
                                    <h1>{'Duración Total por Playlist (DD:HH:MM)'}</h1>
                                    <div className="info__container">
                                        {info8.map(playlist =>
                                            <div key={playlist.name} className="info_">{playlist.name}<div>{functions.MStoTIME(playlist.duration)}</div></div>
                                        )}
                                    </div>
                                </div>
                                <span className="download-text">
                                    Clic acá para descargar reporte <CSVLink data={
                                        info8.map(row => ({playlist: row.name, long: functions.MStoTIME(row.duration)}))
                                    } headers={[{label: 'Nombre de Playlist', key: 'playlist'}, {label: 'Duración de la Playlist', key: 'long'}]} 
                                    style={prettyLink}
                                    filename="duracion_total_por_playlist.csv">CSV ⬇</CSVLink>
                                </span>
                            </div>
                        :
                        (index === 8) ? 
                            <div className="weekly__sales__report">
                                <div className="report-graph-container">
                                    {info9 === undefined ? ' ' : <Bar data={{
                                            labels: info9.map(line => `${line.week} - ${line.year}`),
                                            datasets:[{
                                                label: 'Ventas',
                                                backgroundColor: 'rgb(128, 120, 255)',
                                                fontColor: 'white',
                                                fontSize: 30,
                                                data: info9.map(line => line.sum),
                                            }]
                                        }
                                    } options={{
                                        title: {
                                            fontColor: 'white',
                                            display: true,
                                            text: `Ventas semanales entre ${weeklySalesExtras.initialDate ? weeklySalesExtras.initialDate : ''} y ${weeklySalesExtras.finishDate ? weeklySalesExtras.finishDate : ''}`,
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
                                                scaleLabel: {
                                                    labelString: 'Ventas',
                                                    display: true,
                                                    fontColor: 'white',
                                                },
                                                ticks: {
                                                    stepSize: 1,
                                                    beginAtZero: true,
                                                    fontSize: 16,
                                                    fontColor: 'white',
                                                }
                                            }],
                                            xAxes: [{
                                                scaleLabel: {
                                                    labelString: 'Semana',
                                                    display: true,
                                                    fontColor: 'white',
                                                },
                                                ticks: {
                                                    fontSize: 16,
                                                    fontColor: 'white',

                                                }
                                            }]
                                        }
                                    }} height={500} width={1500}/>}
                                </div>
                                <div className="input__components">
                                    <input
                                        className="initial__date report__input"
                                        type="date"
                                        placeholder="Fecha inicial"
                                        value={initialDate}
                                        onChange={e => changeInitialDate(e.target.value)}
                                    />
                                    <input
                                        className="end__date report__input"
                                        type="date"
                                        placeholder="Fecha final"
                                        value={finishDate}
                                        onChange={e => changeFinishDate(e.target.value)}
                                    />
                                    <button 
                                        className="submit__button" 
                                        type="submit" 
                                        onClick={
                                            () => onSubmitWeeklySales(initialDate, finishDate)
                                        }
                                    >
                                        {'GENERAR'}
                                    </button>
                                    <span className="download-text-inputs">
                                        {'Descargar reporte\n'} <CSVLink data={
                                            info9.map(week => ({week: week.week, count: week.count}))
                                        } headers={[{label: 'Semana', key: 'week'}, {label: 'Ventas', key: 'count'}]} 
                                        style={prettyLink}
                                        filename="ventas_semanales.csv">CSV ⬇</CSVLink>
                                    </span>
                                </div>
                            </div>
                        :
                        (index === 9) ? 
                            <div className="most__sold__artists__report">
                                <div className="report-graph-container">
                                    {info10 === undefined ? ' ' : <Bar data={{
                                            labels: info10.map(artist => artist.name),
                                            datasets:[{
                                                label: 'Ventas',
                                                backgroundColor: 'rgb(128, 120, 255)',
                                                fontColor: 'white',
                                                fontSize: 30,
                                                data: info10.map(artist => artist.count),
                                            }]
                                        }
                                    } options={{
                                        title: {
                                            fontColor: 'white',
                                            display: true,
                                            text: `${mostSoldArtistsExtras.number ? mostSoldArtistsExtras.number : ''} Artistas con más canciones vendidas entre ${mostSoldArtistsExtras.initialDate ? mostSoldArtistsExtras.initialDate : '...'} y ${mostSoldArtistsExtras.finishDate ? mostSoldArtistsExtras.finishDate : ''}`,
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
                                                scaleLabel: {
                                                    labelString: 'Ventas',
                                                    display: true,
                                                    fontColor: 'white',
                                                },
                                                ticks: {
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
                                    }} height={500} width={1500}/>}
                                </div>
                                <div className="input__components">
                                    <input
                                        className="initial__date report__input"
                                        type="date"
                                        placeholder="Fecha inicial"
                                        value={initialDate}
                                        onChange={e => changeInitialDate(e.target.value)}
                                    />
                                    <input
                                        className="end__date report__input"
                                        type="date"
                                        placeholder="Fecha final"
                                        value={finishDate}
                                        onChange={e => changeFinishDate(e.target.value)}
                                    />
                                    <input
                                        className="number report__input"
                                        type="number"
                                        style={{
                                            color: 'black'
                                        }}
                                        placeholder="Número de artistas"
                                        value={n}
                                        onChange={e => changeN(e.target.value)}
                                    />
                                    <button 
                                        className="submit__button" 
                                        type="submit"
                                        onClick={
                                            () => onSubmitMostSoldArtists(initialDate, finishDate, n)
                                        }
                                    >
                                        {'GENERAR'}
                                    </button>
                                    <span className="download-text-inputs">
                                        {'Descargar reporte \n'} <CSVLink data={
                                            info10.map(artist => ({aritst: artist.name, count: artist.count}))
                                        } headers={[{label: 'Artista', key: 'artist'}, {label: 'Ventas', key: 'count'}]} 
                                        style={prettyLink}
                                        filename="artistas_mas_vendidos.csv">CSV ⬇</CSVLink>
                                    </span>
                                </div>
                            </div>
                        :
                        (index === 10) ? 
                            <div className="most__sold__genres__report">
                                <div className="report-graph-container">
                                    {info11 === undefined ? ' ' : <Bar data={{
                                            labels: info11.map(genre => genre.name),
                                            datasets:[{
                                                label: 'Ventas',
                                                backgroundColor: 'rgb(255, 128, 120)',
                                                fontColor: 'white',
                                                fontSize: 30,
                                                data: info11.map(genre => genre.count),
                                            }]
                                        }
                                    } options={{
                                        title: {
                                            fontColor: 'white',
                                            display: true,
                                            text: `Géneros con más canciones vendidas entre ${mostSoldGenresExtras.initialDate ? mostSoldGenresExtras.initialDate : ''} y ${mostSoldGenresExtras.finishDate ? mostSoldGenresExtras.finishDate : ''}`,
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
                                                scaleLabel: {
                                                    labelString: 'Ventas',
                                                    display: true,
                                                    fontColor: 'white',
                                                },
                                                ticks: {
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
                                    }} height={500} width={1500}/>}
                                </div>
                                <div className="input__components">
                                    <input
                                        className="initial__date report__input"
                                        type="date"
                                        placeholder="Fecha inicial"
                                        value={initialDate}
                                        onChange={e => changeInitialDate(e.target.value)}
                                    />
                                    <input
                                        className="end__date report__input"
                                        type="date"
                                        placeholder="Fecha final"
                                        value={finishDate}
                                        onChange={e => changeFinishDate(e.target.value)}
                                    />
                                    <button 
                                        className="submit__button" 
                                        type="submit"
                                        onClick={
                                            () => onSubmitMostSoldGenres(initialDate, finishDate)
                                        }
                                    >
                                        {'GENERAR'}
                                    </button>
                                    <span className="download-text-inputs">
                                        {'Descargar reporte \n'} <CSVLink data={
                                            info11.map(genre => ({artist: genre.name, count: genre.count}))
                                        } headers={[{label: 'Artist', key: 'artist'}, {label: 'Ventas', key: 'count'}]} 
                                        style={prettyLink}
                                        filename="generos_mas_vendidos.csv">CSV ⬇</CSVLink>
                                    </span>
                                </div>
                            </div>
                        :
                        (index === 11) ? 
                            <div className="most__sold__genres__report">
                                <div className="report-graph-container">
                                    {info11 === undefined ? ' ' : <Bar data={{
                                            labels: info12.map(row => row.name),
                                            datasets:[{
                                                label: 'Reproducciones',
                                                backgroundColor: 'rgb(255, 128, 120)',
                                                fontColor: 'white',
                                                fontSize: 30,
                                                data: info12.map(row => row.count),
                                            }]
                                        }
                                    } options={{
                                        title: {
                                            fontColor: 'white',
                                            display: true,
                                            text: info12[0] === undefined ? 'Canciones más reproducidas' : `${info12.length} Canciones más reproducidas de ${info12[0].artist}`,
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
                                                scaleLabel: {
                                                    labelString: 'Reproducciones',
                                                    display: true,
                                                    fontColor: 'white',
                                                },
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
                                    }} height={500} width={1500}/>}
                                </div>
                                <div className="input__components">
                                    <input
                                        className="artist__name report__input"
                                        type="text"
                                        placeholder="Artista"
                                        value={artistName}
                                        onChange={e => changeArtistName(e.target.value)}
                                    />
                                    <input
                                        className="number report__input"
                                        type="number"
                                        style={{
                                            color: 'black'
                                        }}
                                        placeholder="Número de canciones"
                                        value={n}
                                        onChange={e => changeN(e.target.value)}
                                    />
                                    <button 
                                        className="submit__button" 
                                        type="submit"
                                        onClick={
                                            () => onSubmitArtistReproductions(artistName, n)
                                        }
                                    >
                                        {'GENERAR'}
                                    </button>
                                    <span className="download-text-inputs">
                                        {'Descargar reporte \n'} <CSVLink data={
                                            info12.map(row => ({song: row.name, count: row.count}))
                                        } headers={[{label: 'Canción', key: 'genre'}, {label: 'Reproducciones', key: 'count'}]} 
                                        style={prettyLink}
                                        filename="reproducciones_de_artista.csv">CSV ⬇</CSVLink>
                                    </span>
                                </div>
                            </div>
                        :
                        <div>
                        </div>
            }
            <button className="reportbutton" onClick={() => forward(changeArtistName, changeFinishDate, changeInitialDate, changeN)}>
                {'>'}
            </button>

        </div>
    )
}


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
        info9: selectors.getReportSection(state, types.GET_WEEKLY_SALES),
        info10: selectors.getReportSection(state, types.GET_MOST_SOLD_ARTISTS),
        info11: selectors.getReportSection(state, types.GET_MOST_SOLD_GENRES),
        info12: selectors.getReportSection(state, types.GET_ARTIST_REPRODUCTIONS),
        weeklySalesExtras: selectors.getReportSection(state, `${types.GET_WEEKLY_SALES}_EXTRAS`),
        mostSoldArtistsExtras: selectors.getReportSection(state, `${types.GET_MOST_SOLD_ARTISTS}_EXTRAS`),
        mostSoldGenresExtras: selectors.getReportSection(state, `${types.GET_MOST_SOLD_GENRES}_EXTRAS`),
    }),
    dispatch =>({
        forward(clear1, clear2, clear3, clear4){
            dispatch(actions.changeReport())
            clear1('')
            clear2('')
            clear3('')
            clear4(0)
        },
        backward(clear1, clear2, clear3, clear4){
            dispatch(actions.changeReportDown())
            clear1('')
            clear2('')
            clear3('')
            clear4(0)
        },
        onSubmitWeeklySales(initialDate, finishDate){

            const request1 = new Request('http://localhost:8080/api/reports/weeklysales',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
            })

            const request2 = new Request('http://localhost:8080/api/reports/getweeklysales',{
                method: 'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({finishDate, initialDate})
            })

            const request = async () => {
                const response = await fetch(request1);
                const json = await response.json();
                const response2 = await fetch(request2);
                const json2 = await response2.json();
                console.log(json);
                console.log(json2.rows);
                dispatch(actions.addReportSection(types.GET_WEEKLY_SALES, json2.rows, {initialDate, finishDate}));
            }
            
            request();
        },
        onSubmitMostSoldArtists(initialDate, finishDate, number){

            const request1 = new Request('http://localhost:8080/api/reports/mostsoldartists',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
            })

            const request2 = new Request('http://localhost:8080/api/reports/getmostsoldartists',{
                method: 'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({finishDate, initialDate, number})
            })

            const request = async () => {
                const response = await fetch(request1);
                const json = await response.json();
                const response2 = await fetch(request2);
                const json2 = await response2.json();
                console.log(json);
                console.log(json2);
                dispatch(actions.addReportSection(types.GET_MOST_SOLD_ARTISTS, json2.rows, {initialDate, finishDate, number}));
            }
            
            request();
        },
        onSubmitMostSoldGenres(initialDate, finishDate){

            const request1 = new Request('http://localhost:8080/api/reports/mostsoldgenres',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
            })

            const request2 = new Request('http://localhost:8080/api/reports/getmostsoldgenres',{
                method: 'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({finishDate, initialDate})
            })

            const request = async () => {
                const response = await fetch(request1);
                const json = await response.json();
                const response2 = await fetch(request2);
                const json2 = await response2.json();
                console.log(json);
                console.log(json2);
                dispatch(actions.addReportSection(types.GET_MOST_SOLD_GENRES, json2.rows, {initialDate, finishDate}));
            }
            
            request();
        },
        onSubmitArtistReproductions(name, limit){

            const request1 = new Request('http://localhost:8080/api/reports/artistreproductions',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
            })

            const request2 = new Request('http://localhost:8080/api/reports/getArtistReproductions',{
                method: 'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({name, limit})
            })

            const request = async () => {
                const response = await fetch(request1);
                const json = await response.json();
                const response2 = await fetch(request2);
                const json2 = await response2.json();
                console.log(json);
                console.log(json2);
                dispatch(actions.addReportSection(types.GET_ARTIST_REPRODUCTIONS, json2.rows, {limit}));
            }
            
            request();
        },

    })
)(Report)
