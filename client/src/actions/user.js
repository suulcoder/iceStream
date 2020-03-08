import * as types from '../types/user'

const setUser = (id,email,city,state,country,firstname,lastname,role) => ({
    type: types.verified_user_added,
    payload: {
        id,
        email,
        city,
        state,
        country,
        firstname,
        lastname,
        role,
    }
})

export default setUser