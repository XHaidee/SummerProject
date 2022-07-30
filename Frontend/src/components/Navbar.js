import {AppBar,Box,Toolbar,Typography,Button} from '@mui/material'
import { NavLink ,Navigate} from 'react-router-dom'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getToken } from '../services/jwtService';
const Navbar = () => {
  const {access_token}=getToken()//TO BE CONTINUED.............
  return (
    <>
    <Box sx={{flexGrow:1}} style={{marginBottom:'4rem'}}>
           <AppBar position='fixed'  sx={{backgroundColor:"#d6ab7d"}}>
               <Toolbar>
                   <Typography variant='h5' component='div'
                   sx={{flexGrow:1 ,color:'#cc3300', cursor:'pointer'}}>
                   BAK. AND DAIRY
                   </Typography>
                   {/* <Button component={NavLink} to='/login' sx={{color:'#cc3300'}} style={({isActive})=>{
                     return{backgroundColor:isActive ?'#ffd426':''}
                   }}><ShoppingCartTwoToneIcon/></Button>                  */}
                   <Button component={NavLink} to='/' sx={{color:'#cc3300'}} style={({isActive})=>{
                     return{backgroundColor:isActive ?'#e6ccb2':''}
                   }}>Home</Button>
                    <Button component={NavLink} to='/cart' sx={{color:'#cc3300'}} style={({isActive})=>{
                     return{backgroundColor:isActive ?'#e6ccb2':''}
                   }}><ShoppingCartCheckoutIcon sx={{fontSize:'xl'}}></ShoppingCartCheckoutIcon></Button>
                   <Button component={NavLink} to={!access_token ? '/login':"/customer"} sx={{color:'#cc3300'}} style={({isActive})=>{
                     return{backgroundColor:isActive ?'#e6ccb2':''}
                   }}><AccountCircleIcon sx={{fontSize:'xl'}}></AccountCircleIcon></Button>                            
               </Toolbar>
           </AppBar>
    </Box>
    </>
  )
}

export default Navbar