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
    
    <Container >
      
    <Box>
        <div>
          <h1 style={{padding:'1em 0.5em 1em 0em'}}>YOUR CART</h1>
          
        </div>
        {cart.cartItems.length===0?(
        <div>YOUR CART IS EMPTY</div>
        ):(
      <Grid container spacing={1}>
  <Grid  xs={8}>
        <TableContainer sx={{witdth:'110vw'}} className="custable" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{fontSize:'18px',fontWeight:'600'}}>Product</TableCell>
                <TableCell sx={{fontSize:'18px',fontWeight:'600'}}align="center">Quantity</TableCell>
                <TableCell sx={{fontSize:'18px',fontWeight:'600'}}align="center">Price</TableCell>
                <TableCell sx={{fontSize:'18px',fontWeight:'600'}}align="center">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.cartItems.map((cartItem) => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                      <img src={cartItem.image} style={{objectFit:'cover',}} height="200px" width="250px" alt="hello this is img"
                      />
                      </Typography>
                      <Typography sx={{ fontSize: 19,fontWeight:'600',marginTop:'1em',textAlign:'center' }} color="red" gutterBottom>
                      {cartItem.product_name}
                      </Typography>
                   
                    </CardContent>
                  </Card>
                  </TableCell>
                  <TableCell align="right">
                    <Button 
                    sx={{marginRight:"5px"}} 
                    onClick={()=>handleAddToCart(cartItem)}>
                      <span style={{fontSize:'42px',fontWeight:'1',color:'black'}}>+</span>
                    </Button>
                   <span sx={{fontSize:'18px'}}> {cartItem.cartQuantity} </span>
                   <Button 
                    sx={{marginLeft:"5px"}} 
                  
                  onClick={()=>handleDecreaseCart(cartItem)}
                  >
                    <span style={{fontSize:'42px',fontWeight:'1',color:'black'}}>-</span>
                   </Button>
                   </TableCell>
                  <TableCell sx={{fontSize:'17px'}}align="right">Rs:{cartItem.price}</TableCell>
                  <TableCell sx={{fontSize:'17px'}} align="right">Total:{cartItem.cartQuantity*cartItem.price}</TableCell>
                  
                  <Button align="right"
                    sx={{color:"black" ,margin:"1em"}}
                    onClick={()=>handleRemoveFromCart(cartItem)}
                    >╳</Button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
            
        <Grid  xs={1}>
        </Grid>
          
        <Grid  xs={3}>
          <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
                 Cart Summery
                </Typography>
                <Typography variant="h5" component="div">
                  Total Amount
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                  
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 19 }} gutterBottom>
                  Rs:{cart.cartTotalAmount}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={NavLink} to={access_token? '/checkout' : '/login'}>Checkout</Button>
              </CardActions>
            </Card>
          </Grid>
      </Grid>

        )}


    <Button  sx={{color:'#cc3300' ,backgroundColor:"# ffd426"}} 
      onClick={()=>handleClearCart()}
      >Clear Cart</Button>
      </Box>
      <ToastContainer />
    </Container>
  )
}

export default Cart