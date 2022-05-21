import {AppBar,Box,Toolbar,Typography,Button} from '@mui/material'
import { NavLink } from 'react-router-dom'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
const Navbar = () => {
  return (
    <>
    <Box sx={{flexGrow:1}}>
           <AppBar position='static'  sx={{backgroundColor:"#f0e68c"}}>
               <Toolbar>
                   <Typography variant='h5' component='div'
                   sx={{flexGrow:1 ,color:'#cc3300'}}>
                   BAK. AND DAIRY
                   </Typography>
                   {/* <Button component={NavLink} to='/login' sx={{color:'#cc3300'}} style={({isActive})=>{
                     return{backgroundColor:isActive ?'#ffd426':''}
                   }}><ShoppingCartTwoToneIcon/></Button>                  */}
                   <Button component={NavLink} to='/' sx={{color:'#cc3300'}} style={({isActive})=>{
                     return{backgroundColor:isActive ?'#ffd426':''}
                   }}>Home</Button>
                    <Button component={NavLink} to='/cart' sx={{color:'#cc3300'}} style={({isActive})=>{
                     return{backgroundColor:isActive ?'#ffd426':''}
                   }}><ShoppingCartTwoToneIcon sx={{fontSize:'xl'}}></ShoppingCartTwoToneIcon></Button>                   
                   
               </Toolbar>
           </AppBar>
    </Box>
    </>
  )
}

export default Navbar