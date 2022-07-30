import React from 'react'
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container,Grid,Button,TextField,Card,Typography,CardContent,CardActions,Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { removeToken,getToken } from '../../../services/jwtService';
import { NavLink } from 'react-router-dom';
import {useGetLoggedUserQuery} from '../../../services/userAuthApi'
import {useState,useEffect} from "react";
import { setCustomer } from '../../../features/authentication/customerSlice';
import { useDispatch ,useSelector} from 'react-redux';
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
  axios.put(URL,data,config).then(res=>{console.log(res.data);})
		.catch((error)=>console.log(error))
  
  document.getElementById("reg-form").reset();

	};
  

  //  if(data&&isSuccess){
  //   // setCustomer({
  //   //   email: data.email,
  //   //   name: data.name,
  //   // })
  // }
  
 
  //LOG OUT SECTION
    
    const handleLogout=()=>{
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    
      //DESTROYIN TOKEN
     if(!localStorage.getItem('access_token')){
      toast.info('product added',{position:"bottom-left",});
      navigate("/login")
     
     }
     
    }

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

  axios.post(URL,value,config).then(res=>{console.log(res.data);})
  .catch((error)=>console.log(error))
  }








return (
    <Container maxWidth="md">  
    <Box> 
      <div></div>
<Grid container spacing={2}>
  
  <Grid  xs={1}>
        </Grid> 
        <Grid  xs={5}>
        <Card sx={{ minWidth: 275 }}>
              <CardContent>
              <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
                 Hello  : {userData .name}
                </Typography>
               
                <Typography variant="h5" component="div">
                  Manage Your Order
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                </Typography>
                <div>
       <div>
            <table>
            <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
            {cart.cartItems.map((cartItem) => (
            <tr>
                <td>{cartItem.product_name}</td>
                <td>{cartItem.price}</td>
                <td>{cartItem.cartQuantity}</td>
            </tr>
                ))}
            </table>
            <div>
                 Cart Total Amount Rs:{amount}
            </div>
            <div>
                 Cart Total Quantity Rs:{quantity}
            </div> 
            <div>
                
            </div> 
            <div>
            </div>  
       </div>
        <Button onClick={order} sx={{backgroundColor:'#ffd426',color:'#cc3300',
                        mt:3}}>Place order</Button>
        
         </div>
              </CardContent>
              <CardActions>
                <Button  component={NavLink} to='/Checkout' size="small"  sx={{backgroundColor:'#ffd426',color:'#cc3300',
                        mt:3}}>Payment Method</Button>
              </CardActions>
            </Card>
          </Grid>
    
         <Grid  xs={1}></Grid>
        <Grid  xs={5}>
        <Card sx={{ minWidth: 275 }}>
              <CardContent>
              {/* <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
                 Hello  : {userData .name}
                </Typography> */}
               
                <Typography variant="h5" component="div">
                 
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                </Typography>

                <Box component=""noValidate sx={{mt:3 ,color:'#cc3300'}} id="reg-form">
                  <Box>
                    <h1>EDIT YOUR INFORMATION</h1>
                  {/* </Box>
                  
                    <TextField  onChange={(evt)=>handle(evt)} sx={{mt:3,color:'red'}} required fullWidth id='name' name="customer_name" label="User Name"/>
                  <TextField onChange={(evt)=> handle(evt)} sx={{mt:3,color:'red'}} required fullWidth id='phone' name="phone" label="Phone" type='number'/> 
                    <TextField onChange={(evt)=>handle(evt)}  sx={{mt:3,color:'red'}} required fullWidth id='address' name="address" label="address"/> 
                    <Box textAlign='center'>  */}
                        <Button type="submit" onClick={e=>onFormSubmit(e)} sx={{backgroundColor:'#ffd426',color:'#cc3300',
                        mt:3}}>
                          Edit
                        </Button>
                    </Box>   
                 </Box>
              </CardContent>
              {/* <CardActions>
                <Button  component={NavLink} to='/Checkout' size="small" >Checkout</Button>
              </CardActions> */}
            </Card>
          </Grid>
      </Grid>

       


    
      </Box>
      <Button variant="outlined" onClick={handleLogout} sx={{color:' #e65c00'}} >
      
              Logout
            </Button>
            <ToastContainer />

    </Container>
    
  )
}

export default CustomerPage