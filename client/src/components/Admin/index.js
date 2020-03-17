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
            <div className="admin_supertitle"><strong>ADMIN MODULE:</strong></div>
            <div className="admin_header">
                <div className="admin_bar1"></div>  
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
                <div className="admin_bar1"></div>
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
                <div className="admin_bar1"></div>
                <div className="admin_bar1"></div>
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
                <div className="admin_bar1"></div>
                <div className="admin_bar1"></div>
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
                <div className="admin_bar1"></div>
                <div className="admin_bar1"></div>
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
                <div className="admin_bar1"></div>
                <div className="admin_bar1"></div>
                <div className="admin_column">
                <div className="admin_title">Can Inactivate Track?</div>
                    {users.map(
                    element => (
                            <div className="item">
                            <CheckBox key={element} id={element} property={'canInactivateSong'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar1"></div>
                <div className="admin_bar1"></div>
                <div className="admin_column">
                <div className="admin_title">Can Modify Song?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canModifySong'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar1"></div>
                <div className="admin_bar1"></div>
                <div className="admin_column">
                <div className="admin_title">Can Delete Song?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canDeleteSong'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar1"></div>
                <div className="admin_bar1"></div>
                <div className="admin_column">
                <div className="admin_title">Can Modify Album?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canModifyAlbum'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar1"></div>
                <div className="admin_bar1"></div>
                <div className="admin_column">
                <div className="admin_title">Can Delete Album?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canDeleteAlbum'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar1"></div>
                <div className="admin_bar1"></div>
                <div className="admin_column">
                <div className="admin_title">Can Modify Artist?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canModifyArtist'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar1"></div>
                <div className="admin_bar1"></div>
                <div className="admin_column">
                <div className="admin_title">Can Delete Artist?</div>
                    {users.map(
                    element => (
                        <div className="item">
                            <CheckBox key={element} id={element} property={'canDeleteArtist'}></CheckBox>
                        </div>
                    )
                    )}
                </div>
                <div className="admin_bar1"></div>
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