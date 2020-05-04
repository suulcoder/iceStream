import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import BoughtTrack from '../BoughtTrack';
import * as actions from '../../actions/cart'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';  
import * as appActions from '../../actions/app'

const Cart = ({tracks,onsubmit,total,bought}) => {
    return (
        <div className="cart" id="cart">
            <div className="cart_tittle">MY CART</div>
            <div className="bought">
                <div alt='' className="image_">IMAGE</div>
                <strong className="bought_name">{'Name'}</strong>
                <text className="bought_q"> {'Quantity'} </text>
                <text className="bought_n"> {'Unit Price'} </text>
                <text className="bought_n"> {'SubTotal'} </text>
                <button  type="submit" onClick={
                    () => onsubmit(bought,total)
                }>{'BUY NOW'}
                </button>
            </div>
            {tracks.length!==0?(
                <Fragment>
                    {tracks.map(
                        track => (
                            <BoughtTrack key={track} id={'track'+track}>
                            </BoughtTrack>
                        ))}
                </Fragment>
            ):(
                <div className="message__">{'FIRST ADD SOME TRACKS TO THE CART'}</div>
                )
            }
            <div className="tittle___">TOTAL: $ {Math.round(total*100,2)/100}</div>
        </div>
    )
}

export default connect(
    state=>({
        tracks: selectors.getAllCartId(state).filter(id=>(selectors.getQuantity(state,parseInt(id))!==0)),
        total: selectors.getAllCartId(state).map(id=>{
            const price = selectors.getElement(state,'track'+id).unitprice;
            const quantity = selectors.getQuantity(state,parseInt(id));
            return (price*quantity)
        }).reduce(((prev,current)=>prev+current),0),
        bought: selectors.getCart(state)
    }),
    dispatch=>({
        onsubmit(tracks,total){
            const request = new Request('http://localhost:8080/api/invoice',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({total:(Math.round(total*100,2)/100)})
            })
            fetch(request)
            .then(response => response.json())
            .then(data => {
                Object.keys(tracks).forEach(id => {
                if(tracks[id]!==0){
                    const request1 = new Request('http://localhost:8080/api/buy',{
                        method:'POST',
                        headers: { 'Content-Type':'application/json'},
                        body: JSON.stringify({id:parseInt(id),quantity:tracks[id],invoiceid:data.rows[0].makeinvoice})
                    })
                    fetch(request1)
                    .then(response => response.json())
                    .then(data => {
                        const input = document.getElementById('cart');  
                        html2canvas(input)  
                        .then((canvas) => {  
                            var imgWidth = 200;  
                            var pageHeight = 290;  
                            var imgHeight = canvas.height * imgWidth / canvas.width;  
                            var heightLeft = imgHeight;  
                            const imgData = canvas.toDataURL('image/png');  
                            const pdf = new jsPDF('p', 'mm', 'a4')  
                            var position = 0;  
                            var heightLeft = imgHeight;  
                            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
                            pdf.save("download.pdf");  
                            dispatch(actions.removeFromCart(id))
                            dispatch(appActions.changeState(1))
                        });  
                    })
                }
            });
            })            
        }
    })
)(Cart)