//HANDLING JWT TOKEN
//STORING
const storeToken=(value)=>{
    if(value){
        console.log("store Token")
        const {access,refresh}=value
        localStorage.setItem('access_token',access)
        localStorage.setItem('refresh_token',refresh)
    }
}
//FETCHING
const getToken=()=>{
    let access_token=localStorage.getItem('access_token')
    let refresh_token=localStorage.getItem('refresh_token')
    return{
        access_token,refresh_token
    }
}
//DESTROYING
const removeToken = ()=>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}

export {storeToken,getToken,removeToken}