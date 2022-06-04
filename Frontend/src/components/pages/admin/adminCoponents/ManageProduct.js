import * as React from 'react';
import {Table,Button} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import {useState,useEffect} from "react";



// function createData(name, category, price, quantity, desc,image,edit) {
//   return { name, category, price, quantity, desc ,image,edit};
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
 
// ];

function ManageProduct() {
  const[products,setProducts]=useState([])
  useEffect(()=>{
      getAllProduct();
  },[])

  
  async function getAllProduct(){
    try{
      const products=await axios.get("http://127.0.0.1:8000/api/user/productapi/")
      setProducts(products.data)
      console.log(products.data)
    }
    catch(error){
      console.log('somthing is wrong');
    }
  }
  const handleDelete = async id=>{
    await axios.delete(`http://127.0.0.1:8000/api/user/productapi/${id}`);
    var newProduct=products.filter((item)=>{
      return item.id!==id;
    })
    setProducts(newProduct)
  }

  return (
    <>
    <TableContainer component={Paper} hidden={0}>
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
          {products.map((row,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.product_name}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.desc}</TableCell>
              <TableCell align="right">  
                      <CardMedia
                        component="img"
                        height="40"
                        image={row.image}
                        alt="green iguana"
                      />
              </TableCell>
              <TableCell  align="right" sx={{display:'inline-flex'}}><Button variant="contained" component={NavLink} 
              to={`/edit/${row.id}`}
               sx={{backgroundColor:"#ffe680" ,color:'#e65c00'}} 
               endIcon={<EditIcon />}>
                     
                </Button>{row.edit}
                <Button ariant="contained" sx={{backgroundColor:"#ffe680" ,color:'#e65c00'}}>
                  <DeleteIcon onClick={()=>handleDelete(row.id)}/>
                </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button component={NavLink} to='/add' sx={{color:'#cc3300' ,mt:3}} style={({onClick})=>{
                     return{backgroundColor:'#ffd426'}
                   }}>Add Product</Button>
    </>
  );
}



export default ManageProduct