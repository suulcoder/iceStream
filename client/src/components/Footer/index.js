import './styles.css';
import * as selectors from '../../reducers'
import React from 'react';
import { connect } from 'react-redux';

const Footer = ({isSelected,type,id,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song}) => (
    <div className="footerCont">
        <div className="empty"></div>
        <div className="bar"></div>
        {(isSelected)?(
            <div className="selectedTrack">
                <img alt='' src={image} className="footer_img"></img>
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
        if(selectors.getSelected(state)!==null){
            return ({
                isSelected:true,
                type:Object.values(selectors.getSelected(state))[0],
                id:Object.values(selectors.getSelected(state))[1],
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
            })
        }
        return {isSelected:false}
    }
    
        ,
    undefined
)(Footer)