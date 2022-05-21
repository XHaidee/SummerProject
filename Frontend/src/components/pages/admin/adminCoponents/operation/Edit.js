import React from 'react'
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material';
import {Table,Button} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink } from 'react-router-dom';

const Edit = () => {
   const {id}=useParams();
   const [product,setProducts]=useState([]);
   useEffect(()=>{
     
async function getProduct(){
        try{
          const product=await axios.get(`http://127.0.0.1:8000/api/user/productapi/${id}`)
          setProducts(product.data)       
        }
        catch(error){
          console.log('somthing is wrong');
        }
      }
        getProduct();
      },[id]);


  return (
    <Container><TableContainer component={Paper}>
      <div>
        <h1>EDIT THE PRODUCT HERE</h1>
      </div>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>PRODUCT NAME</TableCell>
          <TableCell align="right">CATEGORY</TableCell>
          <TableCell align="right">PRICE</TableCell>
          <TableCell align="right">QUANTITY</TableCell>
          <TableCell align="right">DESC</TableCell>
          <TableCell align="right">IMAGE</TableCell>
          <TableCell align="right">EDIT</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        
          <TableRow
          
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">{product.product_name}</TableCell>
            <TableCell align="right">{product.category}</TableCell>
            <TableCell align="right">{product.price}</TableCell>
            <TableCell align="right">{product.quantity}</TableCell>
            <TableCell align="right">{product.desc}</TableCell>
            <TableCell align="right">  
                    <CardMedia
                      component="img"
                      height="40"
                      image={product.image}
                      alt="green iguana"
                    />
            </TableCell>
            <TableCell  align="right"><Button variant="contained" component={NavLink} 
            to={`/admin/edit/${product.id}`}
             sx={{backgroundColor:"#ffe680" ,color:'#e65c00'}} 
             endIcon={<EditIcon />}>
                   Edit
              </Button>{product.edit}</TableCell>
          </TableRow>
   
      </TableBody>
    </Table>
  </TableContainer></Container>
  )
}

export default Edit