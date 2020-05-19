import * as types from '../types/mongo'
import {combineReducers} from "redux";

const lastReports = (state = [], action)=>{
    switch (action.type) {
        case types.FETCH_MONGO:{
            return action.payload
        } default:{
            return state
        }
    }
}

const mongo =  combineReducers({lastReports})

export default mongo

export const getAllReports = state => state.lastReports

