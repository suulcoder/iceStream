import './styles.css';
import React from 'react';
import { connect } from 'react-redux';

const Footer = ({app,role,onSubmit,logout}) => (
    <div className="footerCont">
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
    undefined,
    undefined
)(Footer)