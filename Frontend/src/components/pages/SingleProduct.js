import React from 'react'
import { styled } from '@mui/material/styles';
import {Box,Button,Card,CardMedia,CardContent,Typography,} from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './singlecard.css';
import { addToCart } from '../../features/counter/cartSlice';
import Footer from './footer';

const SingleProduct = () => {
  //STYLE CUTOM THEME
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'yellow',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  



//PRODUCT PART
    const {id}=useParams()
    //  DATA FETCHING 
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
   console.log(product)
   //DATA FETCHING COMPLETION

   //HANDLING THE CART
   const dispatch=useDispatch();
   const handleAddToCart=(product)=>{
     dispatch(addToCart(product))
   }


  return (
    <>
    <hr/>
    <Box sx={{ flexGrow: 1,paddingTop:'1rem !important',width:'600px', margin:"auto" }} >
     
          <h2 style={{textAlign:'center',padding:'1rem',color:'#C5C6C7'}}>Product Detail View</h2>
      
        <Card className='singlecard-component' key={product.id}  sx={{width:'90%',height:'520px', margin:'auto',boxShadow: '10px 5px 5px gray'}} >
      <CardMedia
        component="img"
        height="260"
        image={product.image}
        alt="green iguana"
        
      />
      <CardContent sx={{padding:'1em'}}>
        <Typography gutterBottom variant="h6" component="div" sx={{color:'#66FCF1',fontSize:'24px'}} >
          {product.product_name}
          </Typography>
    <Typography variant="body2" color="text.secondary" sx={{color:'#C5C6C7',fontSize:'18px'}}  >
          {product.desc}
          
          </Typography> 
          <Typography sx={{color:'#C5C6C7',fontSize:'22px'}}>
            Rs:
            {product.price}
          </Typography>
              <Button  onClick={()=> handleAddToCart(product)} className='addcartbutton'>
                   Add To Cart
                </Button>
      </CardContent>
     
    </Card>
    
       
         
 
    </Box>
    <Footer/>
    </>
  )
}

export default SingleProduct





  