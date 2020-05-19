import * as types from '../types/mongo'

export const fetchMongo = (value) =>{
    return({
        type:types.FETCH_MONGO,
        payload:value
    })
}