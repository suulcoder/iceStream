import './styles.css';
import React from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';


const MyIce = ({canAddTrack,canAddArtist,canAddAlbum,canInactivateTrack,canModifyTrack, canDeleteTrack,canModifyAlbum,canDeleteAlbum,canModifyArtist,canDeleteArtist}) => {
    return (
        <div className='myIce'>
            <div className="myPermissions" >
                <div className="myPermissions_"><strong>MY PERMISSIONS:</strong></div>
                <div className="category">
                    <div className="title_category">Add Tracks</div>
                    <img className={(canAddTrack)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Add Ablums</div>
                    <img className={(canAddAlbum)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Add Aritsts</div>
                    <img className={(canAddArtist)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Inactivate Tracks</div>
                    <img className={(canInactivateTrack)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Update Tracks</div>
                    <img className={(canModifyTrack)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Delete Tracks</div>
                    <img className={(canDeleteTrack)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Update Albums</div>
                    <img className={(canModifyAlbum)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Delete Albums</div>
                    <img className={(canDeleteAlbum)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Update Artist</div>
                    <img className={(canModifyArtist)?('isTrue'):('isFalse')} ></img>
                </div>
                <div className="category">
                    <div className="title_category">Delete Albums</div>
                    <img className={(canDeleteArtist)?('isTrue'):('isFalse')} ></img>
                </div>
            </div>
            <div className="admin_bar1"></div>
            <div className="addMyIce">
                <div className="addMyIce_"><strong>MyIce:</strong></div>
                <div className="GrayBar"></div>
                
            </div>
        </div>
    )
}

export default connect(
    state=>({
        canAddTrack:Object.values(selectors.getUser(state))[5],
        canAddAlbum:Object.values(selectors.getUser(state))[6],
        canAddArtist:Object.values(selectors.getUser(state))[8],
        canInactivateTrack:Object.values(selectors.getUser(state))[8],
        canModifyTrack:Object.values(selectors.getUser(state))[9],
        canDeleteTrack:Object.values(selectors.getUser(state))[10],
        canModifyAlbum:Object.values(selectors.getUser(state))[11],
        canDeleteAlbum:Object.values(selectors.getUser(state))[12],
        canModifyArtist:Object.values(selectors.getUser(state))[13],
        canDeleteArtist:Object.values(selectors.getUser(state))[14],
    }),
    dispatch => ({
        onSubmit(value){
    }
}))(MyIce)