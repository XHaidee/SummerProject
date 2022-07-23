  import {Container, Grid,Card,Tabs,Tab,Box } from "@mui/material"
import { useState } from "react";
import UserLogin from "./UserLogin"
import Reg from "./Reg"
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
  <>
<Container maxWidth="xl" sx={{position:'centre'}}>
   <div><h1 style={{textAlign:'center', margin:'2rem'}}> WELCOME TO THE REGISTRATION PAGE</h1></div>
</Container>
    <Grid container sx={{height:'90vh'}}>
      <Grid item lg={3} sm={2} sx={{
        color: 'text.secondary',
        position:'centre', 
        backgroundColor:''
        }}>
        <p></p>
    </Grid>
    <Grid item lg={6} sm={8} sx={{}}>
            <Card sx={{width:'100%', height:'100%',backgroundColor:''}}>
              <Box sx={{borderBottom:1}}>
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
  </>
  )}

export default LoginReg