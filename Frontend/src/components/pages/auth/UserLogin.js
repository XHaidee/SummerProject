import {useState} from 'react'
import { TextField,Button,Box,Alert } from "@mui/material";
import { NavLink,useNavigate} from "react-router-dom";
import { useLoginUserMutation } from '../../../services/userAuthApi';
const UserLogin = () => {
    const [error,setError]=useState({
        status:false,
        msg:'Please login',
        type:'',
        x:'error'
    })
    const navigate=useNavigate();
    const[loginUser,{isLoading}]=useLoginUserMutation()
    const s={
        color:'#cc3300',
    };
    const handlesubmit=async(e)=>{
           e.preventDefault();
           const data=new FormData(e.currentTarget);
           const actualData={
               email:data.get('email'),
               password:data.get('password'),
           }

          
          
        const res=await loginUser(actualData)
        if(res.error){
                  if(actualData.email && actualData.password){
 
            document.getElementById('login-form').reset();
            
        
             }
             else{
                setError({status:true,msg:'All Fields Are Required',x:'error'})
            }
          console.log(res.data)
            console.log(res.error)
        }
        if(res.data){
         navigate('/admin')
         setError({status:true,msg:'Login sucess',x:'success'})
          
        }
       
    };
  
  return (
    <>
          <Box component="form"noValidate sx={{mt:3 ,color:'#cc3300'}} id="login-form"
          onSubmit={handlesubmit}> 
            <TextField required fullWidth id='email' name="email" label="Email Address"/>
            <TextField sx={{mt:3,color:'red'}} required fullWidth id='password' name="password" label="Password Address" type='password'/>
             <Box textAlign='center'> 
                 <Button type="submit" sx={{backgroundColor:'#ffd426',color:'#cc3300',
                 mt:3}}>
                     Login
                 </Button>
                 
             </Box>
             <NavLink to="/" style={{textDecoration:"none"}} >
                 <div style={s}> Forgot Password? </div> 
             </NavLink>
                <Alert severity={error.x}>{error.msg}</Alert>
             </Box>
    </>
  )
}

export default UserLogin