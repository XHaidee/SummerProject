import * as React from 'react';
import './product.css';
import Card from '@mui/material/Card';
import {ToastContainer,toast} from 'react-toastify'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import {useState,useEffect} from "react";
import "./customClass.css"
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { addToCart } from '../../features/counter/cartSlice';
import {NavLink, useNavigate } from 'react-router-dom';
import Footer from './footer';

 

const Home = () => {
  const nev=useNavigate();
//handling click event

//FETCHING AND DISPLAY PRODUCTS FROM THE PRODUCT API SECTION
 const [data,setProducts]=useState([]);
 useEffect(()=>{
getAllProducts();
 },[])
async function getAllProducts(){
  try{ 
    const data =await axios.get("http://127.0.0.1:8000/api/user/productapi/")
    setProducts(data.data);
    // console.log(data.data);
  }catch(error){
    console.log("somthing is wrong")
  }
    }

    
//ADD TO CART SECTION
const dispatch=useDispatch();
const handleAddToCart=(data)=>{
      dispatch(addToCart(data))
  }
  return (
    
    <div style={{background:"black"}}>
    <div class="img-carousel">
      <div className='image-sec'>
        <img 
        src="https://images.unsplash.com/photo-1566698629409-787a68fc5724?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        height="500vh"
        width="100%"
        className='imgcaro'
        />
        <h1 className='imgcap' style={{position:'absolute', color:'#C5C6C7',top:"250px",width:'25%',color:'white', zIndex:"100",margin:"0px 30px"}}>
          Welcome To Bak And Dairy
          </h1>
          <h3 style={{position:'absolute', color:'#C5C6C7',top:"350px",width:'25%',color:'white', zIndex:"100",margin:"0px 30px"}}>
            A great place for coffee and pastries.
            Also available cake for birthday and for different occasions.</h3>
      </div>
    </div>
  
    <h1 align="center" style={{color:"#66FCF1"}}>Our Products</h1>
    
   
    <div className='product-sec'>
    <h3 style={{color:"#66FCF1"}}>Category 1</h3> 
    {
      data.map((data,i)=>(
       <div className="customClass"> 
       
    <Card key={i} sx={{width:'260px', height:'325px',background:"black"}} className="homecard" >
      <CardMedia
        component="img"
        height="160"
        
        image={data.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{color:'#66FCF1'}}  >
          {data.product_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{color:'#C5C6C7'}} >
        {data.desc.slice(0,50)}... </Typography><br/>
        <Button sx={{color:'#45A291 !important',paddingLeft:"0px !important"}} size="small"  component={NavLink} 
              to={`/SingleProduct/${data.id}`}>view</Button>
          
          <Button sx={{color:'#45A291 !important',paddingLeft:"0px !important"}} size="small" >Rs:{data.price}</Button>
        <Button sx={{color:'#45A291 !important',paddingLeft:"0px !important"}} size="small" onClick={()=> handleAddToCart(data)}>
         <AddShoppingCartIcon sx={{color:'#45A291',paddingLeft:"0px !important"}}></AddShoppingCartIcon>
         </Button>
      </CardContent>
    </Card>
    </div>
      ))
   
}</div>
<ToastContainer />

<br/><br/>
<ToastContainer />


<Footer/>
</div>
  );
}

export default Home