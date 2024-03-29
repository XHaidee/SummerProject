import React from 'react'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container,Grid,Button,TextField,Card,Typography,CardContent,CardActions,Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { removeToken,getToken } from '../../../services/jwtService';
import { NavLink } from 'react-router-dom';
import {useGetLoggedUserQuery} from '../../../services/userAuthApi'
import {useState,useEffect} from "react";
import { setCustomer } from '../../../features/authentication/customerSlice';
import { useDispatch ,useSelector} from 'react-redux';
import Footer from '../footer';
import '../product.css';
const CustomerPage = () => {
  //DECLARING CUSTOMER EDIT INFORMATION SECTION
  const [cust,setcust]=useState({
    "name":"",
    "phone":"",
    "address":""
  });
  //handling input
  function handle(e){
    const newdata={...cust}
    newdata[e.target.id]=e.target.value
    setcust(newdata)
    console.log(newdata)
  }
  

  //USER PROFILE SECTION
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {customer}=useSelector(state=>state.customer)
  const {access_token}=getToken()
  console.log(access_token)
  const {data,isSuccess}=useGetLoggedUserQuery(access_token)
  const [userData,setUserData]=useState({
    id:"",
    email:"",
    name:""
  })
   console.log(data)
  // localStorage.setItem('customler_data',JSON.stringify(data))
  // const customer=JSON.parse(localStorage.getItem("customler_data"))
  // console.log(customer.name)
  // const config={headers :{Authorization:`Bearer ${access_token}`}};
  // const URL =`http://127.0.0.1:8000/api/user/customerapi/${data.id}`;
  // axios.get(URL,config).then(res=>{console.log(res.data);})
	// 	.catch((error)=>console.log(error))
  
    useEffect(()=>{
      console.log("I am called");
      if(data&&isSuccess){
        setUserData({
          id:data.id,
          eamil:data.email,
          name:data.name,
        })
        // console.log(data.email)
        // dispatch( setCustomer({data:data}))
                
       
        }
      else{
        console.log("not none ass")
      }
      
},[data,isSuccess])
// console.log(customer)


//CUSTIMER INPUT
async  function  onFormSubmit(e){
  e.preventDefault();
  const data=cust;
  // data.append('customer_name',name);
  // data.append('phone',phone);
  // data.append('address',address);
 
  const config={headers :{
    Authorization:`Bearer ${access_token}`,'Content-Type':'application/json'}};
  const URL =`http://127.0.0.1:8000/api/user/customerapi/2/`;
  axios.put(URL,data,config).then(res=>{console.log(res.data);   })
		.catch((error)=>console.log(error))
  
  document.getElementById("reg-form").reset();

	};
  

  //  if(data&&isSuccess){
  //   // setCustomer({
  //   //   email: data.email,
  //   //   name: data.name,
  //   // })
  // }

    //<-------------ORDER SECTION START HERE ------------->
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

  axios.post(URL,value,config).then(res=>{console.log(res.data);  navigate("/checkout");  })
  .catch((error)=>console.log(error));
  }

return (
  <>
  <hr/>
    <Container sx={{margin:'auto'}}>  
    <Box> 
        <Card sx={{ width: 475, textAlign:"center",margin:'auto',backgroundColor:'black', border:'solid 2px #404040' }}>
              <CardContent>
              <Typography sx={{ fontSize: 34,color:'#66FCF1 !important' }}  gutterBottom>
                 Hello  : {userData .name}
                </Typography>
                <h2 align="center"  style={{color:"#45A29E"}}>Your Orders:</h2> <br/>
                <div>
       <div>
        <hr/>
            <table style={{margin:'auto',color:"#45A29E",fontSize:'20px',width:'80%'}}>
            <tr className='trow' style={{ border: 'solid 2px #45A29E !important',padding:'10em !important'}}>
                <th >Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
            {cart.cartItems.map((cartItem) => (
            <tr style={{ border: 'solid 2px #45A29E !important'}}>
                <td>{cartItem.product_name}</td>
                <td>{cartItem.price}</td>
                <td>{cartItem.cartQuantity}</td>
            </tr>
                ))}
            </table>
            <hr/>
            <div style={{margin:'30px 10px 10px 10px',textAlign:'left',color: '#45A29E'}}>
                 Cart Total Amount Rs:{amount}
            </div>
           
            <div style={{margin:'10px 10px',textAlign:'left',color: '#45A29E'}}>
                 Cart Total Quantity Rs:{quantity}
            </div> 
            <div>
            </div> 
            <div>
            </div>  
       </div>
        <Button onClick={order} className='order' sx={{ margin:"1em 0em", borderRadius: '0px !important',  border:' solid 2px #66FCF1 !important',
  color:'#C5C6C7 !important',
  fontSize: '18px !important'}}>Place order</Button>
        
         </div>
              </CardContent>
             
            </Card>
      </Box>
            <ToastContainer />
    </Container>
    <Footer/>
    </>
  )
}

export default CustomerPage