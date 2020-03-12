import './styles.css';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/app'
import * as userActions from '../../actions/user'
import throttle from 'lodash/throttle'

const Login = ({onSubmit}) => {
    const [user,changeUser] = useState('')
    const [password,changePassword] = useState('')
    return (
        <div className="login">
            <input
            className="user"
            type="text"
            placeholder="username"
            value={user}
            onChange={e => changeUser(e.target.value)}
            />
            <input
                className="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={e=>changePassword(e.target.value)}
            />
            <button className="login_button" type="submit" onClick={
                () => onSubmit(user,password)
            }>
                {'LOGIN'}
            </button>
        </div>
    )
}

export default connect(
    undefined,
    dispatch => ({
        onSubmit(user,password){
            const request = new Request('http://localhost:8080/api/checkuser',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({user:user,password:password})
            })
            fetch(request)
                .then(async(response)=>{
                    response.json()
                    .then(throttle(table => {
                        if(table!==null){
                            try{
                                const data = table.rows 
                                dispatch(userActions.setUser(data[0]))
                                dispatch(actions.changeState(1))
                            }
                            catch(err){
                                dispatch(userActions.setUsertoNull())
                                alert("USERNAME OR PASSWORD ARE INCORRECT")
                            }
                        }
                    },3000))
                })
        }
    })
)(Login)