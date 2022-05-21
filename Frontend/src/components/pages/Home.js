import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import {useState,useEffect} from "react";
import "./customClass.css"
import { Container } from '@mui/material';
 
const Home = () => {
 const [data,setProducts]=useState([]);
 useEffect(()=>{
getAllProducts();
 },[])
async function getAllProducts(){
  try{ 
    const data =await axios.get("http://127.0.0.1:8000/api/user/productapi/")
    setProducts(data.data);
    console.log(data.data);
  }catch(error){
    console.log("somthing is wrong")
  }
}
  return (
    <Container maxWidth="md" >
    {
      data.map((data,i)=>(
       <div className="customClass"> 
        <Card key={i} className="card">
      <CardMedia
        component="img"
        height="140"
        image={data.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.product_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {data.desc}
          </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{color:'#cc3300'}} size="small">Rs:{data.price}</Button>
        <AddShoppingCartIcon sx={{color:'#cc3300'}}></AddShoppingCartIcon>
      </CardActions>
    </Card>
    </div>
    

      ))
   
}
</Container>
  );
}

export default Home