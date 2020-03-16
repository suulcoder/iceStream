import './styles.css';
import React, {useState} from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import UserPermision from '../UserPermission'
import CheckBox from '../CheckBox';

const Admin = ({users,onSubmit}) => {
    const [query,changeQuery] = useState('')
    return (
        <div className='admin'>
            <div className="search_admin">
                <input
                className="query"
                type="text"
                placeholder=" Search"
                value={query}
                onChange={e => changeQuery(e.target.value)}
                onKeyUp={e=> onSubmit(e.target.value)}
                />
            </div>
            <div className="admin_header">
                <div className="admin_column">
                <div className="admin_title">USERNAME</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <UserPermision key={element} id={element}>
                            </UserPermision>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar1"></div>  
                <div className="admin_bar2"></div>
                <div className="admin_column">
                <div className="admin_title">Can Login?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canLogin'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar2"></div>
                <div className="admin_bar3"></div>
                <div className="admin_column">
                <div className="admin_title">Can add Artist?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canAddArtist'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar3"></div>
                <div className="admin_bar3"></div>
                <div className="admin_column">
                <div className="admin_title">Can add Album?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canAddAlbum'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar3"></div>
                <div className="admin_bar3"></div>
                <div className="admin_column">
                <div className="admin_title">Can add Track?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canAddTrack'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar3"></div>
                <div className="admin_bar4"></div>
                <div className="admin_column">
                <div className="admin_title">Can Inactivate?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canInactivate'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar4"></div>
                <div className="admin_bar4"></div>
                <div className="admin_column">
                <div className="admin_title">Can Modify?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canModify'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar4"></div>
                <div className="admin_bar4"></div>
                <div className="admin_column">
                <div className="admin_title">Can Delete?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canDelete'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

export default connect(
    state=>({
        users: selectors.getAllUsers(state)
    }),
    dispatch => ({
        onSubmit(value){
        console.log(value)
    }
}))(Admin)