import './styles.css';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../reducers'
import * as userActions from '../../actions/user'
import * as actions from '../../actions/elemnts'
import * as appActions from '../../actions/app'

const Search = ({onSubmit,app}) => {
    const [query,changeQuery] = useState('')
    return (
        <div className="search">
            <input
            className="query"
            type="text"
            placeholder=" Search"
            value={query}
            onChange={e => changeQuery(e.target.value)}
            onKeyUp={e=> onSubmit(e.target.value,app)}
            />
        </div>
    )
}

export default connect(
    state=>({
        app:selectors.getAppState(state)
    }),
    dispatch => ({
        onSubmit(value,app){
            if(app===4){
                if(value){
                    dispatch(userActions.setEpmty())
                    const request = new Request('http://localhost:8080/api/search/user',{
                    method:'POST',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify({value:'%'+value+'%'})
                    })
                    fetch(request)
                        .then(async(response)=>{
                            response.json()
                            .then(table => {
                                table.rows.forEach(element => {  
                                    dispatch(userActions.addToOrder(element))
                                });
                            })
                        })
                }
                else{
                    fetch('http://localhost:8080/api/user',{method:'GET'})
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(element => {
                            dispatch(userActions.addUser(element))
                        });
                    }) 
                }
            }
            else if(app===1 || app===2){
                if(value===String('')){
                    console.log("here")
                    dispatch(appActions.changeState(1))
                }
                else{
                    const request = new Request('http://localhost:8080/api/search/track',{
                    method:'POST',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify({value:'%'+value+'%'})
                    })
                    fetch(request)
                        .then(async(response)=>{
                            response.json()
                            .then(table => {
                                table.rows.forEach(element => {  
                                    dispatch(actions.addSearchELement('track',Object.values(element)[0]))
                                });
                            })
                        })
                    dispatch(appActions.changeState(2))
                    const request1 = new Request('http://localhost:8080/api/search/album',{
                    method:'POST',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify({value:'%'+value+'%'})
                    })
                    fetch(request1)
                        .then(async(response)=>{
                            response.json()
                            .then(table => {
                                table.rows.forEach(element => {  
                                    dispatch(actions.addSearchELement('album',Object.values(element)[0]))
                                });
                            })
                        })
                    dispatch(appActions.changeState(2))

                    dispatch(appActions.changeState(2))
                    const request2 = new Request('http://localhost:8080/api/search/artist',{
                    method:'POST',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify({value:'%'+value+'%'})
                    })
                    fetch(request2)
                        .then(async(response)=>{
                            response.json()
                            .then(table => {
                                table.rows.forEach(element => {  
                                    dispatch(actions.addSearchELement('artist',Object.values(element)[0]))
                                });
                            })
                        })
                    dispatch(appActions.changeState(2))
                }                
            }
        }
    })
)(Search)