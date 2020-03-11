import * as types from '../types/app'

const app = (state=1,action) => {
    switch (action.type) {
        case types.appState_Changed:
            return action.payload;
        default:
            return state
    }
}

export default app

export const getAppState = state => state;