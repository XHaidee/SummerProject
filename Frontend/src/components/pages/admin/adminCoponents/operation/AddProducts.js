import React from 'react'
import { useLoginPorductMutation } from '../../../../../services/userAuthApi';
import { TextField,Button,Box } from "@mui/material";
import { useState } from 'react'

const AddProducts = () => {
  const[loginPorduct,{isLoading}]=useLoginPorductMutation()
// PRODUCT STATE
    const [product,setProducts]=useState({
        product_name:"",
        category:"",
        price:"",
        quantity:"",
        desc:"",
        image:""
       
    });
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

  const onTextFieldInput=(e)=>{
setProducts({
  ...product,
  [e.target.name]:e.target.value
})

  }
  console.log(product)

// MANAGING STATE FOR THE CATEGORY INPUT
// const [age, setAge] = React.useState('');
// const handleChange = (event) => {
//   setAge(event.target.value);
// };

async  function  onFormSubmit(e){
    
  // const res=await loginPorduct(product)
  //  console.log(res)
  try{
   console.log('done')
  e.preventDefalult()
  fetch('http://127.0.0.1:8000/api/user/productapi/',
  {method:'POST',
  headers: {
    'Content-Type': 
        'application/json;charset=utf-8'
},
   body:product
  })
  .then(res=>console.log(res))
  .catch(error=>console.log(error))
}

catch{
  console.log('ERror')
}
}
  return (
  <>
     <Box component="form"noValidate sx={{mt:3 ,color:'#cc3300'}} id="reg-form">
          <Box>
            <h1>THE PRODUCT ADDITION PAGE</h1>
          </Box>
            <TextField  onChange={e=> onTextFieldInput(e)} required fullWidth id='product_name' name="product_name" label="Product Name"/>
           <TextField onChange={e=> onTextFieldInput(e)} sx={{mt:3,color:'red'}} required fullWidth id='image' name="category" label="Category" type='number'/> 
            <TextField onChange={e=> onTextFieldInput(e)} sx={{mt:3}} required fullWidth id='Price' name="price" label="price"/> 
          <TextField onChange={e=> onTextFieldInput(e)} sx={{mt:3,color:'red'}} required fullWidth id='image' name="quantity" label="Quantity" type='number'/>
            <TextField onChange={e=> onTextFieldInput(e)} sx={{mt:3}} required fullWidth id='desc' name="desc" label="desc"/>
           <TextField onChange={e=> onTextFieldInput(e)} sx={{mt:3,color:'red'}} required fullWidth id='image' name="image" label=" " type='file'/>
             <Box textAlign='center'> 
                 <Button type="" onClick={e=>onFormSubmit(e)} sx={{backgroundColor:'#ffd426',color:'#cc3300',
                 mt:3}}>
                   Add Product
                 </Button>
             </Box>

             </Box>
   
  </>
    )
  }
export default AddProducts