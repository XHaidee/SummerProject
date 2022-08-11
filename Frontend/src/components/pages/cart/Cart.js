import React from 'react'
import { toast,ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import {
  Table,TableBody,TableContainer,TableCell,TableHead,TableRow,Grid,Paper,CardActions
} from '@mui/material';
import {Box,Button, Container,Typography,Card,CardContent} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import {NavLink ,Navigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import '../customClass.css';
import { getToken } from '../../../services/jwtService';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearCart, decreaseCart, getTotals, removeFormCart } from '../../../features/counter/cartSlice';
import './cart.css';
import { margin } from '@mui/system';
import Footer from '../footer';

const Cart = () => {
  const {access_token}=getToken()
  const cart=useSelector((state)=>state.counter);
  console.log(cart )
const dispatch=useDispatch()
useEffect(()=>{
    dispatch(getTotals());
},[cart,dispatch]);
const handleRemoveFromCart=(cartItem)=>{
  dispatch(removeFormCart(cartItem)); 
}
const handleDecreaseCart=(cartItem)=>{
  dispatch(decreaseCart(cartItem));  
};
const handleAddToCart=(data)=>{
  dispatch(addToCart(data))
};
const handleClearCart=()=>{
  dispatch(clearCart());
};
  return (
    <>
  <hr/>
       
        {cart.cartItems.length===0?(
        <div className='empty'>
          <h2 align="center" className='empty-cart' style={{color:"#C5C6C7"}}> YOUR CART IS EMPTY
          </h2>
          </div>
        ):(
          <Container >
      
          <Box>
      <Grid container spacing={1}>
  <Grid  xs={8}>
  <Button className='clearcart' sx={{ margin:"1em 0em", borderRadius: '0px !important',  border:' solid 2px #66FCF1 !important',
  color:'#C5C6C7 !important',
  fontSize: '18px !important'}} 
      onClick={()=>handleClearCart()}
      >Clear Cart</Button>
        
        <TableContainer sx={{witdth:'110vw'}} className="custable" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{fontSize:'18px',textAlign:'center',fontWeight:'600',color:'#66FCF1 !important'}}>Product</TableCell>
                <TableCell sx={{fontSize:'18px',fontWeight:'600',color:'#66FCF1 !important'}}align="center">Details</TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.cartItems.map((cartItem) => (
                <TableRow >
                  <TableCell component="th" scope="row">
                  <Card sx={{ minWidth: 275, border:'solid 1px #404040',backgroundColor:'black'}}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                      <img src={cartItem.image} style={{objectFit:'cover'}} align="center" height="200px" width="300px" alt="hello this is img"
                      />
                      </Typography>
                      <Typography sx={{ fontSize: 19,fontWeight:'600',marginTop:'1em',textAlign:'center',color:"#45A29E" }}  gutterBottom>
                      {cartItem.product_name}
                      </Typography>
                   
                    </CardContent>
                  </Card>
                  </TableCell>
                  <TableCell width={315} align='center'>
                    <Button 
                    sx={{marginRight:"5px"}} 
                    onClick={()=>handleDecreaseCart(cartItem)}
                   >
                  <span style={{fontSize:'42px',fontWeight:'1',color:"#45A29E"}}>&lt;</span>
                    </Button>
                   <span style={{fontSize:'22px',fontWeight:'1',color:"#45A29E"}}> {cartItem.cartQuantity} </span>
                   <Button 
                    sx={{marginLeft:"5px",color:"#45A29E"}} 
                    onClick={()=>handleAddToCart(cartItem)}
                  >
                    <span style={{fontSize:'42px',fontWeight:'1',color:"#45A29E"}}>&gt;</span>
                   </Button>
                  <br/>
              <span style={{fontSize:'22px',paddingTop:"25px !important",color:"#45A29E"}}>  <br/> Rs:{cartItem.price} </span><br/>
              <span style={{fontSize:'22px',paddingTop:"25px !important",color:"#45A29E"}}><br/> Total:{cartItem.cartQuantity*cartItem.price}</span></TableCell>
                  
                  <Button align="right"
                    sx={{color:"black" ,margin:"1em",color:"#66FCF1"}}
                    onClick={()=>handleRemoveFromCart(cartItem)}
                    >╳</Button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
            
        
          
        <Grid  xs={3}>
          <Card className="summary" sx={{ minWidth: 385, margin:'5em 2em' }}>
              <CardContent>
                <Typography sx={{ fontSize: 34,color:"#66FCF1",textAlign:'center',borderBottom:'solid 1px #404040' }} color="text.secondary" gutterBottom>
                 Cart Summary
                </Typography>
                <Typography variant="h5" sx={{fontSize: 18,color:"#C5C6C7",textAlign:'center',marginTop:'2.5em'}} component="div" >
                  Total Amount
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                  
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 33,color:"#66FCF1",textAlign:'center' }} gutterBottom>
                  Rs:{cart.cartTotalAmount}
                </Typography>
              </CardContent>
              <CardActions>
                <Button  sx={{ margin:"1em 0em", borderRadius: '0px !important',  border:' solid 2px #66FCF1 !important',
  color:'#C5C6C7 !important',
  fontSize: '18px !important',width:'100%'}}  className='clearcart' component={NavLink} to={access_token? '/Customer' : '/login'}>Checkout</Button>
              </CardActions>
            </Card>
          </Grid>
      </Grid>
      </Box>
      <ToastContainer />
    </Container>

        )}
        <Footer/>
    </>
  )
}

export default Cart