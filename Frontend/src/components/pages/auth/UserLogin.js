import {useEffect, useState} from 'react';
import { toast,ToastContainer } from 'react-toastify';
import { TextField,Button,Box } from "@mui/material";
import { NavLink,useNavigate} from "react-router-dom";
import { useLoginUserMutation } from '../../../services/userAuthApi';
import { getToken, storeToken } from '../../../services/jwtService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../../features/authentication/authSlice';
import Home from '../Home';
import './auth.css'
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
            const res=await loginUser(actualData)
            if(res.data){
                //STORING TOKEN
                storeToken(res.data.token);
                let {access_token}=getToken();
                dispatch(setUserToken({access_token:access_token}))
                
                if(res.data.admin==1){
                    localStorage.setItem('admin', 1);
                    toast.info('Welcome  Admin',{position:"bottom-left",});
                    navigate('/admin');
                    
                }
                else{
               
                navigate('/customer')
                
                }
                console.log(res.data);
               }
            // console.log(res)
            setError(res.error.data);
         
            
            if(res.error){
                if(actualData.email && actualData.password){

                 document.getElementById('login-form').reset();
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
     
          <Box component="form"width={500} noValidate sx={{mt:3,margin:'auto',paddingTop:'1em' }} id="login-form"
          onSubmit={handlesubmit}> 
            <TextField required fullWidth id='email' name="email" label="Email Address"/>
            {error!=="" ? <div>{error.email}</div>:""}
            <TextField sx={{mt:3,color:'red'}} required fullWidth id='password' name="password" label="Password Address" type='password'/>
            {error!=="" ? <div>{error.password}</div>:""}
             <Box textAlign='center'> 
                 <Button className='log'  type="submit" sx={{ padding:'0.5em 2em',margin:"1em 1em", borderRadius: '0px !important',  border:' solid 2px black !important',
  color:'#000 !important',
  fontSize: '18px !important'}}>
                     Login
                </Button>
                   
                
                 
             </Box>
           
             <ToastContainer />
             </Box>
             <ToastContainer />
    </>
  )
}

export default UserLogin