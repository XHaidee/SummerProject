import React from 'react'
import { Container,Grid,Button,Card,Typography,CardContent,CardActions,Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../../services/jwtService';


const CustomerPage = () => {
    const navigate=useNavigate();
    const handleLogout=()=>{
      //DESTROYIN TOKEN
      removeToken()
      navigate("/")
    }
  return (
    <Container maxWidth="md">  
    <Box>
<Grid container spacing={2}>
  <Grid  xs={3}>
        </Grid>
            
        <Grid  xs={6}>
        <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
                 Cart Summery
                </Typography>
                <Typography variant="h5" component="div">
                  Total Amount
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                  
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 19 }} gutterBottom>
                  Rs
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" >Checkout</Button>
              </CardActions>
            </Card>
          </Grid>
    
          
        <Grid  xs={3}>
         
          </Grid>
      </Grid>

       


    
      </Box>
      <Button variant="outlined" onClick={handleLogout} sx={{color:' #e65c00'}} >
              Logout
            </Button>
    </Container>
  
    
  )
}

export default CustomerPage