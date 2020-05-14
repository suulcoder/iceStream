import React, {useEffect} from "react";
import {connect} from "react-redux";
import './styles.css'

import * as selectors from '../../reducers'

import MongoTransaction from "../MongoTransaction";


/*const getLatestRequest = new Request('http://localhost:8080/api/getLatest', {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
})
fetch(getLatestRequest).then(async function test(response) {
    console.log(response.json().then(value => console.log(value)))
})*/



const MongoReport = ({allReports}) => (
    <div className='mongo-report'>
        <div className='title'>LAST PURCHASES</div>
        {allReports.map(report => <MongoTransaction key = {report._id} userID={report.client.name} songID={report.song.title}/>)}
    </div>
)

export default connect(state => ({
        allReports:selectors.getMongoReports(state)
    }),undefined)(MongoReport)