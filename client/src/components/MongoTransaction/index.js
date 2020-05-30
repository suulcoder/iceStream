import React from "react";
import {connect} from "react-redux";
import './styles.css'
import * as selectors from '../../reducers'
import user from "../../reducers/user";

const MongoTransaction = ({userID, userName, songName, recommendation}) => (
    <div className='mongo-transaction'>
        <div>
            {`User: ${userName}`}
        </div>
        <div>
            {`Song: ${songName}`}
        </div>
        <div>
            {`Recommendations: ${recommendation}`}
        </div>
    </div>
)

export default connect(
    (state, {userID, songID}) =>({
        songName:selectors.getElement(state, `track${songID}`).name,
        userName:selectors.getValidUsers(state)[(parseInt(userID)+8)%69][1],
        recommendation:selectors.getElement(state, `track${songID-1}`).name
    }),undefined
)(MongoTransaction)