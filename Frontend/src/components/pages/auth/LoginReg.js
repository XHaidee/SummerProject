  import {Container, Grid,Card,Tabs,Tab,Box } from "@mui/material"
import { useState } from "react";
import {ToastContainer } from 'react-toastify';
import UserLogin from "./UserLogin"
import Reg from "./Reg"
import './auth.css'
const TabPanel=(props)=>{
  const{children,value,index}=props;
  return(
    <div role='tabpanel' hiddeen={value!==index}>
     {
      value===index &&(
        <Box>{children}</Box>
      )
    }
    </div>
  )
}
const LoginReg = () => {
 const [value,setValue]=useState(0);
 const handleChange=(event,newValue)=>{
   setValue(newValue);  
 }
  return (
  <> <hr/>
<Container maxWidth="xl" sx={{position:'centre'}}>
   <div><h1 style={{textAlign:'center', margin:'2rem'}}> WELCOME TO THE REGISTRATION PAGE</h1></div>
</Container>
    <Grid container sx={{height:'95vh'}}>
      <Grid item lg={3} sm={2} sx={{
        color: 'text.secondary',
        position:'centre', 
        backgroundColor:''
        }}>
        <p></p>
    </Grid>
    <Grid item lg={6} sm={8} sx={{}}>
            <Card sx={{width:'80%',margin:'auto', height:'69%',backgroundColor:''}}>
              <Box>
                <Tabs value={value} onChange={handleChange }>
                <Tab label='Login'></Tab>
                <Tab label='Registration'></Tab>
                </Tabs>
                <TabPanel value={value} index={0}><UserLogin/></TabPanel>
                <TabPanel value={value} index={1}><Reg/></TabPanel>
              </Box>             
            </Card>
     </Grid> 
     <Grid item lg={3} sm={2} sx={{
        color: 'text.secondary',
        position:'centre', 
        backgroundColor:''
        }}>
        <p></p>
    </Grid> 
     
  </Grid>
  <ToastContainer />
  </>
  )}

export default LoginReg