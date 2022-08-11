import {AppBar,Box,Toolbar,Typography,Button} from '@mui/material'
import { NavLink ,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getToken } from '../services/jwtService';
import './Navbar.css';
const Navbar = () => {
  const {access_token}=getToken()//TO BE CONTINUED.............
  const admin= localStorage.getItem('admin');
  const navigate=useNavigate()
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
  return (
    
    <>
    <Box sx={{flexGrow:1}} style={{marginBottom:'4rem'}}>
           <AppBar position='fixed'  sx={{backgroundColor:"black"}}>
               <Toolbar>
                   <Typography variant='h5' component='div' className="bakandairy"
                   sx={{flexGrow:2 , cursor:'pointer'}}>
                   B <span className='anding'>&</span> D
                   </Typography>
                   {/* <Button component={NavLink} to='/login' sx={{color:'#cc3300'}} style={({isActive})=>{
                     return{backgroundColor:isActive ?'#ffd426':''}
                   }}><ShoppingCartTwoToneIcon/></Button>                  */}
                   <Button component={NavLink} to='/' sx={{color:'#66FCF1'}} style={({isActive})=>{
                     return{color:isActive ?'#d9d9d9':''}
                   }}>Home</Button>
                    <Button component={NavLink} to='/cart' sx={{color:'#66FCF1'}} style={({isActive})=>{
                     return{color:isActive ?'#d9d9d9':''}
                   }}><ShoppingCartCheckoutIcon sx={{fontSize:'xl'}}></ShoppingCartCheckoutIcon></Button>
                   <Button component={NavLink} to={!access_token ? '/login':admin==1?'/admin':'/order'} sx={{color:'#66FCF1'}} style={({isActive})=>{
                     return{color:isActive ?'#d9d9d9':''}
                   }}><AccountCircleIcon sx={{fontSize:'xl'}}></AccountCircleIcon></Button>  
                   {access_token ? 
                  (  <Button variant="outlined" onClick={handleLogout} sx={{color:' #66FCF1',border:"none !important"}} >
      
                    Logout
                  </Button>):''      
                }            
               </Toolbar>
           </AppBar>
    </Box>
    </>
  )
}

export default Navbar