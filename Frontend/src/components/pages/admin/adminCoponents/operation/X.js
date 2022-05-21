import React, {useState} from 'react';



function App() {
	const [product_name , setName] = useState('');
	const [cat , setCat] = useState('');
	const [price , setPrice] = useState('');
	const [quantity , setQuantity] = useState('');
	const [desc , setDesc] = useState('');
	const [image , setImg] = useState();
console.log(desc)
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');
console.log(formData)
	const handleSubmit=(e)=>{
		e.preventDefault();
		let formData=new FormData();
		formData.append('product_name',product_name);
		formData.append('category',cat);
		formData.append('price',price);
		formData.append('quantity',quantity);
		formData.append('desc',desc);
		formData.append('image',image,image.name);
		fetch('http://127.0.0.1:8000/api/user/productapi/',{
		 method:'POST',
		 body:{"product_name":'rai'}
		}).then(res=>console.log(res))
		.catch(error=>console.log(error ))
	}
	
return (
	<div className="App">
	<header className="App-header">
	<form method='post' >
	{/*when user submit the form , handleSubmit()
		function will be called .*/}
	<h2> Welcome admin </h2>
	
	
  <br/>
		<label >
		Product Name:
		</label><br/>
		<input type="text" name="product_name"value={product_name} required onChange={(e)	=> {setName(e.target.value)}} /><br/>
		{ /*when user write in name input box , handleChange()
			function will be called. */}
		<label >
		Category:
		</label><br/>
    <select value={cat} required onChange={(e)	=> {setCat(e.target.value)}}>
            <option value="dairy">CAT</option>
            <option value="bakery">BAKERY</option>
            <option value="dairy">DAIRY</option>
    </select>
		<br/>
			{ /*when user write in age input box , handleAgeChange()
			function will be called. */}
		<label>
		Price:
		</label><br/>
		<input type="text" value={price} required onChange={(e)	=> {setPrice(e.target.value)}}/><br/>
		{/* when user write in email input box , handleEmailChange()
			function will be called.*/}
		<label>
		Quantity:
		</label><br/>
		<input type="text" value={quantity} required onChange={(e)	=> {setQuantity(e.target.value)}} /><br/>
			{/* when user write in password input box ,
				handlePasswordChange() function will be called.*/}
		<label>
		Desc:
		</label><br/>
		<input type="text" value={desc} required onChange={(e)	=> {setDesc(e.target.value)}} /><br/>
				{/* when user write in confirm password input box ,
					handleConfPasswordChange() function will be called.*/}
			<label>
		Image:    
		</label><br/>
		<input type="file" value={image} required onChange={(e)	=> {setImg(e.target.value)}} /><br/>
				
    <input type="submit" onSubmit={(e) => {handleSubmit(e)}} value="Submit"/>
	</form>
	</header>
	</div>
);
}

export default App;
