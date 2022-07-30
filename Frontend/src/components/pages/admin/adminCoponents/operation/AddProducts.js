import React from 'react'
import { useLoginPorductMutation } from '../../../../../services/userAuthApi';
import { TextField,Button,Box } from "@mui/material";
import { useState } from 'react'
import axios from 'axios';

const AddProducts = () => {
  // const[loginPorduct,{isLoading}]=useLoginPorductMutation()
// PRODUCT STATE
   const [name,setName]=useState("");
   const [category,setCategroy]=useState("");
   const [price,setPrice]=useState("");
   const [quantity,setQuantity]=useState("");
   const [des,setDes]=useState("");
   const [image,setImage]=useState();
// FETCHING CATEGORY TO RENDER IN THE CATEGORY OPTION ON THE FORM
// const [category,setCategroy]=useState();
// useEffect(()=>{
// async function getCategory(){
//         try{
//           const product=await axios.get(`http://127.0.0.1:8000/api/user/categoryapi/`)
//           // console.log(product.data)
//           setCategroy(product.data)
//         }
//         catch(error){
//           console.log('somthing is wrong');
//         }
//       }
//         getCategory();
//       },[]);


  

// MANAGING STATE FOR THE CATEGORY INPUT
// const [age, setAge] = React.useState('');
// const handleChange = (event) => {
//   setAge(event.target.value);
// };

async  function  onFormSubmit(e){
  e.preventDefault();
  // const res=await loginPorduct(product)
  //  console.log(res)
  // try{
  const data=new FormData();
  data.append('product_name',name);
  data.append('category',category);
  data.append('price',price);
  data.append('quantity',quantity);
  data.append('desc',des);
  data.append('image',image,image.name);
  const config={headers :{'Content-Type':'multipart/form-data'}};
  const URL ='http://127.0.0.1:8000/api/user/productapi/';
  axios.post(URL,data,config).then(res=>{console.log(res.data);})
		.catch((error)=>console.log(error))
  
  document.getElementById("reg-form").reset();
	};
  // const data=await axios({
  //   method:'post',
  //   url:'http://127.0.0.1:8000/api/user/productapi/',
  //   data:product}
  // method:'POST',
//   {
//   headers: 
//     'Content-Type': 
//         'multipart/form-data'
// },
  //  body:{product}
  // )
  // .then(res=>console.log(res))
  // .catch(error=>console.log(error))
// }

// catch{
//   console.log('ERror')
// }

  return (
  <>
     <Box component=""noValidate sx={{mt:3 ,color:'#cc3300'}} id="reg-form">
          <Box>
            <h1>THE PRODUCT ADDITION PAGE</h1>
          </Box>
            <TextField  onChange={(evt)=>setName(evt.target.value)} sx={{mt:3,color:'red'}} required fullWidth id='product_name' name="product_name" label="Product Name"/>
           <TextField onChange={(evt)=> setCategroy(evt.target.value)} sx={{mt:3,color:'red'}} required fullWidth id='image' name="category" label="Category" type='number'/> 
            <TextField onChange={(evt)=> setPrice(evt.target.value)}  sx={{mt:3,color:'red'}} required fullWidth id='Price' name="price" label="price"/> 
          <TextField onChange={(evt)=> setQuantity(evt.target.value)}  sx={{mt:3,color:'red'}} required fullWidth id='image' name="quantity" label="Quantity" type='number'/>
            <TextField onChange={(evt)=> setDes(evt.target.value)}  sx={{mt:3,color:'red'}} required fullWidth id='desc' name="desc" label="desc"/>
           <TextField onChange={(evt)=>setImage(evt.target.files[0])} sx={{mt:3,color:'red'}} required fullWidth id='image' name="image" label=" " type='file'/>
             <Box textAlign='center'> 
                 <Button type="submit" onClick={e=>onFormSubmit(e)} sx={{backgroundColor:'#ffd426',color:'#cc3300',
                 mt:3}}>
                   Add Product
                 </Button>
             </Box> 
                    
             </Box>
   
  </>
    )
  }
export default AddProducts