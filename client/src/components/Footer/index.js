import './styles.css';
import * as selectors from '../../reducers'
import React from 'react';
import { connect } from 'react-redux';

const Footer = ({isSelected,type,id,name,album,mediatype,genre,composer,milliseconds,bytes,unitprice,artist,image,song}) => (
    <div className="footerCont">
        <div className="selectedTrack">
        </div>
        <div className="bar"></div>
        <div className="empty"></div>
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