import React from 'react'
import {
  Table,TableHead,TableCell,CardMedia,Button,TableContainer,Paper,TableRow,TableBody,Box,TextField
} from '@mui/material'
import axios from 'axios';
import { getToken } from '../../services/jwtService';
import { useEffect,useState } from 'react';
import { ClassNames } from '@emotion/react';
import './order.css'
import Footer from '../pages/footer';

const Order = () => {
const [cust,setcust]=useState({
    "name":"",
    "phone":"",
    "address":""
  });
async  function  onFormSubmit(e){
    e.preventDefault();
    const data=cust;
    const config={headers :{
      Authorization:`Bearer ${access_token}`,'Content-Type':'application/json'}};
    const URL =`http://127.0.0.1:8000/api/user/customerapi/2/`;
    axios.put(URL,data,config).then(res=>{console.log(res.data);   })
      .catch((error)=>console.log(error))
    
    document.getElementById("reg-form").reset();
    };
  
  function handle(e){
      const newdata={...cust}
      newdata[e.target.id]=e.target.value
      setcust(newdata)
      console.log(newdata)
    }
    

const {access_token}=getToken()
const[orders,setOrders]=useState([])
useEffect(()=>{
    getOrders();
},[])
// console.log("order is",orders)
const config={headers :{
    Authorization:`Bearer ${access_token}`,'Content-Type':'application/json'}};
async function getOrders(){
    try{
        const res=await axios.get("http://127.0.0.1:8000/api/user/orderapi/",config)
       console.log(res.data.data);
       setOrders(res.data.data);
       
    }
    catch(error){
      console.log('somthing is wrong');
    }
    
  }
  return (
    <> <hr/>
    <div>
      
       <div>
       <h1  align="center"  style={{color:'#66FCF1'}}>EDIT YOUR INFORMATION</h1>
        <Box component="" noValidate sx={{mt:3 ,width:'26%',backgroundColor:'	 #999999',margin:'auto',padding:'1em',color:'#cc3300',borderRadius:'15px'}} id="reg-form">
                  <Box>
                   
                  </Box>
                  <Box component="" noValidate sx={{mt:3 ,width:'80%',backgroundColor:'	 #999999',margin:'auto'}}></Box>
                    <TextField  onChange={(evt)=>handle(evt)} className="intext" sx={{mt:3,color:'red',border:'solid 1px 	 #999999',}} required fullWidth id='name' name="customer_name" label="User Name"/>
                  <TextField onChange={(evt)=> handle(evt)} sx={{mt:3,color:'red',border:'solid 1px 	 #999999'}} required fullWidth id='phone' name="phone" label="Phone" type='text'/> 
                    <TextField onChange={(evt)=>handle(evt)}  sx={{mt:3,color:'red',border:'solid 1px 	 #999999'}} required fullWidth id='address' name="address" label="address"/> 
                    <Box textAlign='center'>  
                        <Button type="submit" onClick={e=>onFormSubmit(e)} className='orderbton' sx={{backgroundColor:'	 #999999',margin:'2em',padding:'0.7em 3em',borderRadius:'15px !important',color:'black',border:'2px solid black'}}>
                          Edit
                        </Button>
                    </Box>   
                 </Box></div>
                <h1 align="center" style={{color:'#66FCF1'}}> YOUR ORDERS</h1> 
    <TableContainer component={Paper} hidden={0} sx={{backgroundColor:'black'}} >
      <Table sx={{ width: 1250,margin:'auto' }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
            <TableCell sx={{color:'white',fontSize:'18px'}}>ORDER ID</TableCell>
            <TableCell align="right" sx={{color:'white',fontSize:'18px'}}>TOTAL</TableCell>
            <TableCell align="right" sx={{color:'white',fontSize:'18px'}}>QUANTITY</TableCell>
            <TableCell align="right" sx={{color:'white',fontSize:'18px'}}>STATUS</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} class="tabroww"
            >
              <TableCell component="th" scope="row" sx={{color:'white',fontSize:'18px',padding:'1.1em'}} >{row.id}</TableCell>
              <TableCell align="right" sx={{color:'white',fontSize:'18px',padding:'1.1em'}}>{row.total}</TableCell>
              <TableCell align="right" sx={{color:'white',fontSize:'18px',padding:'1.1em'}}>{row.quantity}</TableCell>
              <TableCell align="right" sx={{color:'white',fontSize:'18px',padding:'1.1em'}}>{row.status}</TableCell>

              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
  
    </div>
    <Footer/>
    </>
  )
}

export default Order