import './styles.css';
import * as selectors from '../../reducers'
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/cart'

const Footer = ({isSelected,isBought,id,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song,state,onsubmit,addToCart,inCart,removeFromCart}) => (
    <div className="footerCont">
        <div className="empty"></div>
        <div className="bar"></div>
        {(isSelected)?(
            <div className="selectedTrack">
                <div className="song_and_link">
                    <img alt='' src={image} className="footer_img"></img>
                    <div className="state">
                        {
                            (isBought)?(
                                <button className="link_" type="submit" onClick={
                                    () => onsubmit(song)}>
                                </button>
                            ):(
                                <Fragment>
                                {
                                    (inCart)?(
                                        <strong className="tittle">ADDED TO CART</strong>
                                    ):(
                                        <button className="link__" type="submit" onClick={
                                            () => addToCart(id)}>
                                        </button>
                                    )
        
                                }  
                                </Fragment>
                            )

                        }          
                        <div><strong>STATE: </strong>{(state)?('ACTIVE'):('INACTIVE')}</div>
                    </div>
                </div>
                <div className="info">
                    <div><strong>Name: </strong>{name}</div>
                    <div><strong>Album: </strong>{album}</div>
                    <div><strong>Artist: </strong>{artist}</div>
                    <div><strong>Genre: </strong>{genre}</div>
                </div>
                <div className="info">
                    <div><strong>Composer: </strong>{composer}</div>
                    <div><strong>MediaType: </strong>{mediatype}</div>
                    <div><strong>Duration: </strong>{Math.floor(milliseconds / 60000) + ":" + ((milliseconds % 60000) / 1000).toFixed(0)}</div>
                    <div><strong>Price: </strong>${unitprice}</div>
                    <div><strong>Size: </strong>{((bytes/1024)/1024).toFixed(2)}Mb</div>
                </div>
            </div>
        ):(
            <div className="selectedTrackNull">
            </div>
        )}
        <div className="empty"></div>
        <div className="bar"></div>
        <div className="footer">
            <div className="myText">IceStream</div>
            <div className="myText">Get info of the best music</div>
            <div className="authorContainer">
                <div className="myText">made by:</div>
                <div className="authors">
                    <a href="https://github.com/suulcoder/">SuulCoder</a> 
                    <a href="https://github.com/GDawg4/">GDawg4</a> 
                    <a href="https://github.com/gera1013">gera1013</a> 
                </div>
            </div>
        </div>
    </div>
)

export default connect(
    state=>{
        if(selectors.getAppState(state)!==0 && selectors.getSelected(state) && selectors.getSelected(state).id && selectors.getAppState(state)!==4 && selectors.getAppState(state)!==3 && selectors.getSelected(state)!==null && selectors.getSelected(state)!==undefined){
            return ({
                isSelected:true,
                type:Object.values(selectors.getSelected(state))[0],
                id:Object.values(selectors.getSelected(state))[1].substring(5),
                name:Object.values(selectors.getSelected(state))[2],
                album:Object.values(selectors.getSelected(state))[3],
                mediatype: Object.values(selectors.getSelected(state))[4],
                genre: Object.values(selectors.getSelected(state))[5],
                composer: Object.values(selectors.getSelected(state))[6],
                milliseconds: Object.values(selectors.getSelected(state))[7],
                bytes: Object.values(selectors.getSelected(state))[8],
                unitprice: Object.values(selectors.getSelected(state))[9],
                artist: Object.values(selectors.getSelected(state))[10],
                image: Object.values(selectors.getSelected(state))[11],
                song: Object.values(selectors.getSelected(state))[12],
                state: Object.values(selectors.getSelected(state))[13],
                isBought: selectors.getBought(state).includes(selectors.getSelected(state).id.substring(5)),
                inCart : selectors.getAllCartId(state).includes(selectors.getSelected(state).id.substring(5))
            })
        }
        return {isSelected:false}
    },
    dispatch => ({
        onsubmit(song){
            window.location.href = song;
        },
        addToCart(id){
            dispatch(actions.addToCart(id,1))
        },
        removeFromCart(id){
            dispatch(actions.removeFromCart(id))
        }
        
    })
)(Footer)