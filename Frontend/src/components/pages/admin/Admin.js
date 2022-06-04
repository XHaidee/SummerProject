import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Box,Stack,Button} from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import ManageProduct from './adminCoponents/ManageProduct';
import ManageOrders from './adminCoponents/ManageOrders';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../../services/jwtService';

//CUSTOM STYLING THE COMPONENT
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


//HANDLING LOGOUT SECTION TOKEN REMOVE
function Admin() {
  const navigate=useNavigate();
  const handleLogout=()=>{
    //DESTROYIN TOKEN
    removeToken()
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
       
        <Grid item xs={12} sm={4} md={3}>
        <Item>
        <Stack direction="col" spacing={2}>
            <Button variant="outlined" sx={{color:' #e65c00'}} >
              Product Management
            </Button>
        </Stack>
        </Item>
        </Grid>

        
        <Grid item xs={12} sm={8} md={9}>
          <Item>
            <ManageProduct/>
            <ManageOrders/>
            
          </Item>
         
        </Grid>
        <Button variant="outlined" onClick={handleLogout} sx={{color:' #e65c00'}} >
              Logout
            </Button>
      </Grid>
    </Box>
    </Container>
  );
}



export default Admin