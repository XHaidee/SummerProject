import React from 'react'
import {Box,Button} from '@mui/material'
import { NavLink } from 'react-router-dom'
const Cart = () => {
  return (
    <Box>
        <div>WELCOME TO THE CART PAGE</div>
    <Button component={NavLink} to='/login' sx={{color:'#cc3300'}} style={({isActive})=>{
        return{backgroundColor:isActive ?'#ffd426':''}
      }}>Login/Regestration</Button>
      </Box>
  )
}

export default Cart