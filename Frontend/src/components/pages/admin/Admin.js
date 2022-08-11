import * as React from 'react';
import {ToastContainer } from 'react-toastify';
import { styled } from '@mui/material/styles';
import {Box,Stack,Tab,Tabs,Button} from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import ManageProduct from './adminCoponents/ManageProduct';
import ManageOrders from './adminCoponents/ManageOrders';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../../services/jwtService';
import { useState } from 'react';

//CUSTOM STYLING THE COMPONENT
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
//Tab for the Hiding of the component
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

//HANDLING LOGOUT SECTION TOKEN REMOVE
function Admin() {

const [value,setValue]=useState(0);
const handleChange=(event,newValue)=>{
  setValue(newValue);  
}

  const navigate=useNavigate();
  const handleLogout=()=>{
    //DESTROYIN TOKEN
    removeToken()
    localStorage.removeItem('admin');
    navigate('/login')
  }
  return (
   <Container maxWidth="">
     <div>
       <h1>
         WELCOME TO THE ADMIN DASHBOARD
       </h1>
     </div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
       
        <Grid item  sm={3} md={2}>
        
        </Grid>

        
        <Grid item xs={12} sm={8} md={9}>
          
        <Box>
              <Tabs value={value} onChange={handleChange }>
                <Tab label='Inventory'></Tab>
                <Tab label='Orders'></Tab>
                {/* <Tab label='Sales'></Tab> */}
                </Tabs>
                <TabPanel value={value} index={0}><ManageProduct/></TabPanel>
                <TabPanel value={value} index={1}><ManageOrders/></TabPanel>
                {/* <TabPanel value={value} index={1}><Sales/></TabPanel> */}
              </Box>
          {/* <Item>
            <ManageProduct/>
            <ManageOrders/>
          </Item> */}
         
        </Grid>
        
      </Grid>
    </Box>
    
    <ToastContainer />
    </Container>
  );
}



export default Admin