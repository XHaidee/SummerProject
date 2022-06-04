import {useEffect, useState} from 'react'
import { TextField,Button,Box,Alert } from "@mui/material";
import { NavLink,useNavigate} from "react-router-dom";
import { useLoginUserMutation } from '../../../services/userAuthApi';
import { getToken, storeToken } from '../../../services/jwtService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../../features/authentication/authSlice';
const UserLogin = () => {
    const [error,setError]=useState({
        eamil:"",
        password:""
    })
    const navigate=useNavigate();
//USEING REDUX STATE TO SET THE TOKEN FOR A GLOBAL SESSION MAINTAINANCE
const dispatch=useDispatch();
//INVOKING THE RTK HOOK TO LOGIN
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

          
if(data.email||data.password!=""){
            const res=await loginUser(actualData)
            if(res.data){
                //STORING TOKEN
                storeToken(res.data.token);
                let {access_token}=getToken();
                dispatch(setUserToken({access_token:access_token}))
                navigate('/admin') 
               }
            console.log(res)
            setError(res.error.data);
            const email=res.error.data.email;
            
            if(res.error){
                if(actualData.email && actualData.password){

                 document.getElementById('login-form').reset();
          
      
           }
          
        // console.log(res.data)
        //   console.log(res.error)
      }
      
}
        // const res=await loginUser(actualData)
        // if(res.error){
        //           if(actualData.email && actualData.password){
 
        //     document.getElementById('login-form').reset();
            
        
        //      }
        //      else{
        //         setError({status:true,msg:'All Fields Are Required',x:'error'})
        //     }
        //   console.log(res.data)
        //     console.log(res.error)
        // }
        // if(res.data){
        //  navigate('/admin')
        //  setError({status:true,msg:'Login sucess',x:'success'})
          
        // }
       
    };
    let {access_token}=getToken();
    useEffect(()=>{
        dispatch(setUserToken({access_token:access_token}))
    },[access_token,dispatch])
  
  return (
    <>
          <Box component="form"noValidate sx={{mt:3 ,color:'#cc3300'}} id="login-form"
          onSubmit={handlesubmit}> 
            <TextField required fullWidth id='email' name="email" label="Email Address"/>
            {error!="" ? <div>{error.email}</div>:""}
            <TextField sx={{mt:3,color:'red'}} required fullWidth id='password' name="password" label="Password Address" type='password'/>
            {error!="" ? <div>{error.password}</div>:""}
             <Box textAlign='center'> 
                 <Button type="submit" sx={{backgroundColor:'#ffd426',color:'#cc3300',
                    mt:3}}>
                     Login
                </Button>
                   
                
                 
             </Box>
             <NavLink to="/" style={{textDecoration:"none"}} >
                 <div style={s}> Forgot Password? </div> 
             </NavLink>
                
             </Box>
    </>
  )
}

export default UserLogin