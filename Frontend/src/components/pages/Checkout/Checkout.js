import React from 'react';
import KhaltiCheckout from "khalti-checkout-web";
import axios from 'axios';
import {  useSelector } from 'react-redux';
import { getToken } from '../../../services/jwtService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer';
import '../product.css';
import { Button } from "@mui/material";


const Checkout = () => {
const navigate=useNavigate()
const {access_token}=getToken()
const notify = () => navigate('/');
//ORDER SUMMERY
    const cart=useSelector((state)=>state.counter);
    var amount=cart.cartTotalAmount;
    var quantity=cart.cartTotalQuantity;
    // var items=cart.cartItems;


//ORDER POST REQUEST
const value={'items':cart.cartItems,
              'amount':amount,
               'quantity':quantity  }
console.log(value);
const URL ='http://127.0.0.1:8000/api/user/orderapi/';

const order=()=>{
  
const config={headers :{
        Authorization:`Bearer ${access_token}`,'Content-Type':'application/json'}};

    axios.post(URL,value,config).then(res=>{
        toast.info(res.data.msg,{position:"bottom-left",});
        console.log(res.data);
    
    })
    .catch((error)=>console.log(error))
}


// KHALTI SECTION
  let config = {
    // replace this key with yours
    "publicKey": "test_public_key_371fdb64b65c48fc84df81279cf3282e",
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {

        onSuccess (payload) {
            const va={
                "token":payload.token,
                "amount":payload.amount
            }
            console.log(va)
            // hit merchant api for initiating verfication
            console.log(payload);
            axios.post('http://127.0.0.1:8000/api/user/khaltiapi/',
            {va})
            .then(res=>{console.log(res.data);
                toast.success('payment sucess',{position:"bottom-top",});
                if(res.data.status=='sucess'){
                        console.log("fuck")
                }
            })
            .catch((error)=>console.log(error))
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};
let checkout = new KhaltiCheckout(config);
//KHALTI CLOSE


  return (
    <>  <hr/> <br/>
  
   <div className='orderplace' style={{margin:'auto !important'}}>
            <h1 align='center' style={{color:'#66FCF1'}}> Order Placed</h1>
            <h3 align='center' style={{fontWeight:'550',textAlign:'center !important',color: '#45A29E'}}>  Cart Total Amount Rs:{amount}</h3 >           
            <h3 align='center' style={{fontWeight:'550',textAlign:'center !important',color: '#45A29E'}}> Cart Total Quantity Rs:{quantity} </h3 > 
            <div style={{display:'flex',justifyContent:'center'}}>
        <Button sx={{ margin:"1em 1em", borderRadius: '0px !important',  border:' none !important',
  backgroundColor:'#652d92 !important',color:'white',padding:'1em',
  fontSize: '18px !important'}} onClick={()=>{checkout.show({amount: amount * 100})}}>pay with khalti</Button>
        <Button className='delivery' sx={{ margin:"1em 1em", borderRadius: '0px !important',  border:' solid 2px #66FCF1 !important',
  color:'#C5C6C7 !important',
  fontSize: '18px !important'}} onClick={notify}>Cash On Delivery!</Button></div>
        <ToastContainer />
   </div>
   <Footer/>
   </>
  )
}

export default Checkout