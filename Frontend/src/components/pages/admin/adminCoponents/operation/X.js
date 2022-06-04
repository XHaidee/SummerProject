import axios from 'axios';
import React from 'react'
import { useState } from 'react'
const X = () => {
	const [name,setName]=useState("");
	const [image,setImage]=useState();

	const add=(e)=>{
		e.preventDefault();
		const data=new FormData();	
		data.append('name',name);
		data.append('image',image,image.name)
		const config={headers :{'Content-Type':'multipart/form-data'}};
		const URL ='http://127.0.0.1:8000/api/user/proapi/';
		axios.post(URL,data,config).then(res=>{console.log(res.data);})
		.catch((error)=>console.log(error))
	};
  return (
	<div> 
		<label>name:
			<input type="text" vlaue={name} onChange={(evt)=>setName(evt.target.value)}/>
		</label>
		<br/>
		<label>
			image:
			<input type="file"  onChange={(evt)=>setImage(evt.target.files[0])}/>
		</label>
		<br/>
		<button onClick={(e)=>add(e)}>submit</button>
	</div>
  )
}

export default X