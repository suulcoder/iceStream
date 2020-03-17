import './styles.css';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/app'
import * as userActions from '../../actions/user'
import throttle from 'lodash/throttle';

const SignUp = ({onSubmit}) => {
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
            if(password && user && email){
                if(passwordConfirm===password){
                    if(email.includes('@') && email.includes('.')){
                        fetch('http://localhost:8080/api/newuserid',{method:'GET'})
                            .then(response => response.json())
                            .then(data => {
                                const request = new Request('http://localhost:8080/api/checkusername',{
                                    method:'POST',
                                    headers: { 'Content-Type':'application/json'},
                                    body: JSON.stringify({user:user})
                                })
                                fetch(request)
                                    .then(async(response)=>{
                                        response.json()
                                        .then(throttle(table => {
                                            if(table.rows.length===0 && table.rows.lenght===undefined){                
                                                const request_user = new Request('http://localhost:8080/api/adduser',{
                                                    method:'POST',
                                                    headers: { 'Content-Type':'application/json'},
                                                    body: JSON.stringify({id:Object.values(data[0])[0]+1,user:user,email:email,password:password,role:'client'})
                                                })
                                                fetch(request_user)
                                                .then(async(response)=>{
                                                    response.json()
                                                    .then(throttle(table1 => {
                                                        dispatch(userActions.setUser({id:Object.values(data[0])[0]+1,user:user,email:email,password:password,role:'client'}))
                                                    },3000))
                                                })
                                            
                                                const per_request = new Request('http://localhost:8080/api/addpermission',{
                                                method:'POST',
                                                headers: { 'Content-Type':'application/json'},
                                                body: JSON.stringify({id:Object.values(data[0])[0]+1,canLogin: 'TRUE',canAddArtist: 'FALSE', canAddAlbum: 'FALSE',canAddTrack: 'FALSE',})
                                                 })
                                                fetch(per_request)
                                                .then(async(response)=>{
                                                    response.json()
                                                    .then(throttle(table => {
                                                        dispatch(actions.changeState(1))
                                                    },3000))
                                                })
                                            }
                                            else{
                                                alert('USER ALREADY EXISTS')
                                            }}),3000)})
                                    })
                    }
                    else{
                        alert("INVALID EMAIL")
                    }
                }
                else{
                    alert("Passwords must be the same and must not be empty")
                }
            }
            else{
                alert("ALL FIELDS MUST BE COMPLETED")
            }
            
        }
    })
)(SignUp)
