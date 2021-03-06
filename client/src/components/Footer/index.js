import './styles.css';
import * as selectors from '../../reducers'
import React, {Fragment} from 'react';
import Iframe from 'react-iframe';
import {connect} from 'react-redux';
import * as actions from '../../actions/cart';
import IframeComm from 'react-iframe-comm';

const currentlySelected = 'Little Dark Age'

const Footer = ({isSelected, isBought, id, name, album, mediatype, genre, composer, milliseconds, bytes, unitprice, artist, image, song, state, onsubmit, addToCart, inCart, role, userid, deezerID}) => {
    
    if(isSelected && isBought){
        onsubmit(id,userid)
    }

    return (
    <div className="footerCont">
        <div className="empty"></div>
        <div className="bar"></div>
        {(isSelected) ? (
            <div className="selectedTrack">
                <div className="song_and_link">
                    <div className='player-wrapper'>

                    </div>
                    <div className="state">
                        {
                            (isBought || role === 'admin') ? (
                                /*<button className="link_" type="submit" onClick={
                                    () => onsubmit(song,id,userid)}>
                                </button>*/
                                <iframe scrolling="no" frameBorder="0" allowtransparency='true'
                                        src={`https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=ff0000&layout=dark&size=medium&type=tracks&id=${deezerID}&app_id=1`}
                                        width="700" height="100"
                                />
                            ) : (
                                <Fragment>
                                    {
                                        (inCart) ? (
                                            <strong className="tittle">ADDED TO CART</strong>
                                        ) : (
                                            <button className="link__" type="submit" onClick={
                                                () => addToCart(id, unitprice)}>
                                            </button>
                                        )

                                    }
                                </Fragment>
                            )

                        }
                        <div><strong>STATE: </strong>{(state) ? ('ACTIVE') : ('INACTIVE')}</div>
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
                    <div>
                        <strong>Duration: </strong>{Math.floor(milliseconds / 60000) + ":" + ((milliseconds % 60000) / 1000).toFixed(0)}
                    </div>
                    <div><strong>Price: </strong>${unitprice}</div>
                    <div><strong>Size: </strong>{((bytes / 1024) / 1024).toFixed(2)}Mb</div>
                </div>
            </div>
        ) : (
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
)}

export default connect(
    state => {
            if (selectors.getAppState(state) !== 0 && selectors.getSelected(state) && selectors.getSelected(state).id && selectors.getAppState(state) !== 4 && selectors.getAppState(state) !== 3 && selectors.getSelected(state) !== null && selectors.getSelected(state) !== undefined) {
                    return ({
                            isSelected: true,
                            type: Object.values(selectors.getSelected(state))[0],
                            id: Object.values(selectors.getSelected(state))[1].substring(5),
                            name: Object.values(selectors.getSelected(state))[2],
                            album: Object.values(selectors.getSelected(state))[3],
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
                            isBought: selectors.getBought(state).includes( parseInt(selectors.getSelected(state).id.substring(5)) ),
                            inCart: selectors.getAllCartId(state).includes(selectors.getSelected(state).id.substring(5)),
                            role: (selectors.getUser(state) != null) ? selectors.getUser(state)[Object.keys(selectors.getUser(state))[1]] : null,
                            userid: selectors.getUser(state).userid,
                            deezerID: selectors.getDeezerId(state)
                    })
            }
        return {isSelected: false}
    },
    dispatch => ({
        onsubmit(id, userid) {
            const request1 = new Request('http://localhost:8080/api/play', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id, userid})
            })
            fetch(request1)
        },
        addToCart(id, unitprice) {
            dispatch(actions.addToCart({id, quantity: 1, unitprice}))
        },
        removeFromCart(id) {
            dispatch(actions.removeFromCart(id))
        }

    })
)(Footer)