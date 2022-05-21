import {useState} from 'react'
import { TextField,Button,Box,Alert, FormControlLabel, Checkbox } from "@mui/material";
import { useRegisterUserMutation } from '../../../services/userAuthApi';
import {useNavigate} from "react-router-dom";

const Reg = () => {
    const [error,setError]=useState({
      email:"",
      name:"",
      password:"",
      password2:""
  })
    const navigate=useNavigate();
    // const s={
    //     color:'#cc3300',
    // }; 
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
         
         setError(actualData);
          if(error.password!==error.password2){

          }
          if(error.email==""){

          }

           const res =await registerUser(actualData)
          if(res.error){
            
          }
          if(res.data){
            console.log(res.data)
          }
         
             
    };
  
  return (
    <>
          <Box component="form"noValidate sx={{mt:3 ,color:'#cc3300'}} id="reg-form"
          onSubmit={handlesubmit}> 
            <TextField required fullWidth id='email' name="email" label="Email Address"/>            
            <TextField sx={{mt:3}} required fullWidth id='name' name="name" label="Name"/>         
            <TextField sx={{mt:3,color:'red'}} required fullWidth id='password' name="password" label="Password " type='password'/>             
            <TextField sx={{mt:3,color:'red'}} required fullWidth id='password2' name="password2" label="Confirm Password" type='password'/>
            <FormControlLabel control={<Checkbox value={true} color="primary"
           name="tc" id="tc"/>} label="Do You  Confirm? "
            /> 
             <Box textAlign='center'> 
                 <Button type="submit" sx={{backgroundColor:'#ffd426',color:'#cc3300',
                 mt:3}}>
                     Sign Up
                 </Button>
                 
             </Box>
                <Alert severity={error.x} sx={{mt:3}}>{error.msg}</Alert>
             </Box>
    </>
  )
}

export default Reg