import './styles.css';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/app'
import * as userActions from '../../actions/user'
import throttle from 'lodash/throttle'

const Login = ({onSubmit}) => {
    const [user,changeUser] = useState('')
    const [password,changePassword] = useState('')
    const [passwordConfirm,changePasswordComfirm] = useState('')
    const [email,changeEmail] = useState('')
    return (
        <div className="signin">
            <input
            className="userSignUp"
            type="text"
            placeholder="username"
            value={user}
            onChange={e => changeUser(e.target.value)}
            />
            <input
                className="email"
                type="text"
                placeholder="email"
                value={email}
                onChange={e=>changeEmail(e.target.value)}
            />
            <input
                className="passwordSignUp"
                type="password"
                placeholder="password"
                value={password}
                onChange={e=>changePassword(e.target.value)}
            />
            <input
                className="passwordConfirm"
                type="password"
                placeholder="password confirmation"
                value={passwordConfirm}
                onChange={e=>changePasswordComfirm(e.target.value)}
            />
            <button className="signUP_button" type="submit" onClick={
                () => onSubmit(user,email,password,passwordConfirm)
            }>
                {'SIGN UP'}
            </button>
        </div>
    )
}

export default connect(
    undefined,
    dispatch=>({
        onSubmit(user,email,password,passwordConfirm){
            if(passwordConfirm===password){
                if(email.includes('@') && email.includes('.')){
                    let myId = 0
                    fetch('http://localhost:8080/api/newuserid',{method:'GET'})
                        .then(response => response.json())
                        .then(data => {
                            const request = new Request('http://localhost:8080/api/adduser',{
                                method:'POST',
                                headers: { 'Content-Type':'application/json'},
                                body: JSON.stringify({id:Object.values(data[0])[0]+1,user:user,email:email,password:password,role:'client'})
                            })
                            fetch(request)
                            .then(async(response)=>{
                                console.log(response)
                                response.json()
                                .then(throttle(table => {
                                    console.log(table)
                                },3000))
                            })
                        })
                        .catch(error => alert("something went wrong"))
                }
                else{
                    alert("INVALID EMAIL")
                }
            }
            else{
                alert("Passwords must be the same")
            }
        }
    })
)(Login)
