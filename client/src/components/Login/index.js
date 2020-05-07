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
                                console.log(data[0])
                                dispatch(userActions.setUser(data[0]))
                                const request1 = new Request('http://localhost:8080/api/login',{
                                    method:'POST',
                                    headers: { 'Content-Type':'application/json'},
                                    body: JSON.stringify({user:user})
                                })
                                fetch(request1)
                                .then(async(response)=>{
                                    const request2 = new Request('http://localhost:8080/api/boughtTracks',{
                                        method:'POST',  
                                        headers: { 'Content-Type':'application/json'},
                                        body: JSON.stringify({user:data[0].userid})
                                    })
                                    fetch(request2)
                                    .then(response => response.json())
                                    .then(data => {

                                        data.rows.forEach(element => {
                                            console.log(element)
                                            dispatch(userActions.addBoughtTrack(element))
                                        });
                                        dispatch(actions.changeState(1))
                                        window.location.href = 'https://accounts.spotify.com/authorize?client_id=9dd9df7b812f484c91490a594286ca76&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=user-read-private%20user-read-email&response_type=token&state=123'                               
                                        
                                    })  
                                })
                            }
                            catch(err){
                                dispatch(userActions.setUsertoNull())
                                alert("USERNAME OR PASSWORD ARE INCORRECT TRY AGAIN!\n\nIF IT DOESN'T WORK PLEASE TALK TO ICESTREAM\nYOU ARE PROBABLY BANNED")
                            }
                        }
                    },3000))
                })
        }
    })
)(Login)