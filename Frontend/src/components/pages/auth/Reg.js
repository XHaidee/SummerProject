import {useState} from 'react'
import { TextField,Button,Box,Alert, FormControlLabel, Checkbox } from "@mui/material";
import { useRegisterUserMutation } from '../../../services/userAuthApi';
import {useNavigate} from "react-router-dom";
import { storeToken } from '../../../services/jwtService';

const Reg = () => {
//HANGLING ERROR USING THE STATE
    const [error,setError]=useState({
      email:"",
      name:"",
      password:"",
      password2:""
  })
    const navigate=useNavigate();
//USER SIGHUP SECTION
    const [registerUser,{isLoading}]=useRegisterUserMutation( )
    
    const handlesubmit=async(e)=>{
           e.preventDefault();
           const data=new FormData(e.currentTarget);
           const actualData={
               name:data.get('name'), 
               email:data.get('email'),
               password:data.get('password'),
               password2:data. get('password2'),
               tc:data.get('tc'),
           }
         
          // if(actualData.email||actualData.name||actualData.password||actualData.password2!=""){
            const res =await registerUser(actualData)
            console.log(res);
            setError(res.error.data);
            storeToken(res.data.token);            
          // }
          // else{
             
          //    console.log("error")
          // }
          //  const res =await registerUser(actualData)        
    };
  
  return (
    <>
          <Box component="form"noValidate sx={{mt:3 ,color:'#cc3300'}} id="reg-form"
          onSubmit={handlesubmit}> 
            <TextField required fullWidth id='email' name="email" label="Email Address"/> 
            {error!="" ? <div>{error.email}</div>:""}           
            <TextField sx={{mt:3}} required fullWidth id='name' name="name" label="Name"/> 
            {error!="" ? <div>{error.name}</div>:""}         
            <TextField sx={{mt:3,color:'red'}} required fullWidth id='password' name="password" label="Password " type='password'/>
            {error!="" ? <div>{error.password}</div>:""}              
            <TextField sx={{mt:3,color:'red'}} required fullWidth id='password2' name="password2" label="Confirm Password" type='password'/>
            {error!="" ? <div>{error.password2}</div>:""} 
            <FormControlLabel control={<Checkbox value={true} color="primary"
           name="tc" id="tc"/>} label="Do You  Confirm? "
            /> 
    
             <Box textAlign='center'> 
                 <Button type="submit" sx={{backgroundColor:'#ffd426',color:'#cc3300',
                 mt:3}}>
                     Sign Up
                 </Button>
                 
             </Box>
                
             </Box>
    </>
  )
}

export default Reg