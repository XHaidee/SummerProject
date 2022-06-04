import React from 'react'
import {Table,TableBody,TableContainer,TableCell,TableHead,TableRow,Paper} from '@mui/material';
import {Box,Button, Container,Typography,Card,CardContent} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Cart = () => {
  const cart=useSelector((state)=>state.counter);
  console.log(cart )
  return (
    
    <Container maxWidth="md">
      
    <Box>
        <div>
          <h1>YOU CART</h1>
          
        </div>
        {cart.cartItems.length===0?(
        <div>YOUR CART IS EMPTY</div>
        ):(
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.cartItems.map((cartItem) => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                      <img src={cartItem.image} height="100px" width="116px"
                      />
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {cartItem.product_name}
                      </Typography>
                      
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {cartItem.desc} 
                      </Typography>
                      
                    <Button sx={{color:"red",bgcolor:"yellow" ,marginLeft:"5px"}}>remove</Button>
           
                    </CardContent>
                    
                  </Card>
                  </TableCell>
                  <TableCell align="right"><Button sx={{color:"red",bgcolor:"yellow",marginRight:"5px"}} ><AddIcon></AddIcon></Button>{cartItem.cartQuantity}<Button sx={{color:"red",bgcolor:"yellow",marginLeft:"5px"}}><RemoveIcon></RemoveIcon></Button></TableCell>
                  <TableCell align="right">Rs:{cartItem.price}</TableCell>
                  <TableCell align="right">Total:{cartItem.cartQuantity*cartItem.price}</TableCell>
                  
  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
    <Button component={NavLink} to='/login' sx={{color:'#cc3300' ,backgroundColor:"# ffd426"}} style={({isActive})=>{
        return{backgroundColor:isActive ?'#ffd426':'#ffd426'}
      }}>Login/Regestration</Button>
      </Box>
    </Container>
  )
}

export default Cart