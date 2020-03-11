import './styles.css';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/app'

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
            const data = {
                user,
                password
            }
            const request = new Request('http://localhost:8080/api/checkUser',{
                method:'POST',
                headers: new Headers({ 'Content-Type':'application/json'}),
                body: JSON.parse(data)
            });
            fetch(request)
                .then(function(response){
                    response.json()
                    .then(function(data){
                        console.log(data)
                    })
                })

            dispatch(actions.changeState(1))
        }
    })
)(Login)