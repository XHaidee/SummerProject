import * as React from 'react';
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
    <>
    <Container maxWidth="md"  >
      <h1>Our Products</h1>
    {
      data.map((data,i)=>(
       <div className="customClass"> 
    <Card key={i} sx={{width:'250px', height:'320px'}} className="homecard" >
      <CardMedia
        component="img"
        height="160"
        
        image={data.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div"  >
          {data.product_name}
        </Typography>
        <Typography variant="body2" color="text.secondary"  >
        {data.desc.slice(0,22)}....
        <Button sx={{color:'#cc3300'}} size="small"  component={NavLink} 
              to={`/SingleProduct/${data.id}`}>view</Button>
          </Typography>
          <Button sx={{color:'#cc3300'}} size="small" >Rs:{data.price}</Button>
        <Button sx={{color:'#cc3300'}} size="small" onClick={()=> handleAddToCart(data)}>
         <AddShoppingCartIcon sx={{color:'#cc3300'}}></AddShoppingCartIcon>
         </Button>
      </CardContent>
    </Card>
    </div>
      ))
   
}
<ToastContainer />
</Container>
<br/><br/>
<ToastContainer />

</>
  );
}

export default Home