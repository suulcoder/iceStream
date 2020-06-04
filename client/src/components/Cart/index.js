import './styles.css';
import React, { Fragment } from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import BoughtTrack from '../BoughtTrack';
import * as actions from '../../actions/cart'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';  
import * as appActions from '../../actions/app'

const Cart = ({tracks,onsubmit,total,bought,userid, selectedUser}) => (
    <div className="cart" id="cart">
        <div className="cart_tittle">MY CART</div>
        <div className="bought">
            <div alt='' className="image_">IMAGE</div>
            <strong className="bought_name">{'Name'}</strong>
            <text className="bought_q"> {'Quantity'} </text>
            <text className="bought_n"> {'Unit Price'} </text>
            <text className="bought_n"> {'SubTotal'} </text>
            <button  type="submit" onClick={
                () => onsubmit(bought,total,userid, selectedUser)
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


export default connect(
    state=>({
        tracks: selectors.getAllCartId(state).filter(id=>(selectors.getQuantity(state,parseInt(id,10))!==0)),
        total: selectors.getAllCartId(state).map(id=>{
            const price = selectors.getElement(state,'track'+id).unitprice;
            const quantity = selectors.getQuantity(state,parseInt(id,10));
            return (price*quantity)
        }).reduce(((prev,current)=>prev+current),0),
        bought: selectors.getCart(state),
        userid: selectors.getUser(state).userid,
        selectedUser:selectors.getUser(state).userid,
    }),
    dispatch=>({
        onsubmit(tracks,total,userid, selectedUser){
            alert("ITEMS WILL BE BOUGHT")
            const request = new Request('http://localhost:8080/api/invoice',{
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({total:(Math.round(total*100,2)/100),userid})
            })
            fetch(request)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(tracks)
                Object.keys(tracks).forEach(id => {
                if(tracks[id]!==0){
                    const request1 = new Request('http://localhost:8080/api/buy',{
                        method:'POST',
                        headers: { 'Content-Type':'application/json'},
                        body: JSON.stringify({id:parseInt(id,10),quantity:tracks[id],invoiceid:data.rows[0].makeinvoice})
                    })

                    fetch(request1)
                    .then(response => response.json())
                    .then(data => {
                        const input = document.getElementById('cart');  
                        html2canvas(input)  
                        .then((canvas) => {  
                            var imgWidth = 200;  
                            var imgHeight = canvas.height * imgWidth / canvas.width;  
                            const imgData = canvas.toDataURL('image/png');  
                            const pdf = new jsPDF('p', 'mm', 'a4')  
                            var position = 0;  
                            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
                            pdf.save("IceStreamdownload.pdf");  
                            dispatch(actions.removeFromCart(id))
                            dispatch(appActions.changeState(1))
                        });  
                    })
                    }
                    const purchaseRequest = new Request('http://localhost:8080/api/purchase', {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(
                            {
                                'client': {
                                    'name': `${selectedUser}`,
                                    'Info': 'ClientInfo'
                                },
                                'song': {
                                    'title': `${id}`,
                                    'Info': 'SongInfo'
                                },
                                'date': `${new Date()}`
                            })
                    })

                    fetch(purchaseRequest).then(value => {
                        console.log('yay')})
                });
            })            
        }
    })
)(Cart)