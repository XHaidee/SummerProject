import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"; 
import Contact from "./components/pages/Contact";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/Home"
import LoginReg from "./components/pages/auth/LoginReg";
import Reg from "./components/pages/auth/Reg";
import Edit from "./components/pages/admin/adminCoponents/operation/Edit";
import AddProducts from "./components/pages/admin/adminCoponents/operation/AddProducts";
import Admin from "./components/pages/admin/Admin";
import ManageOrders from "./components/pages/admin/adminCoponents/ManageOrders";
import Cart from "./components/pages/cart/Cart";
import CustomerPage from "./components/pages/customer/CustomerPage";
import { useSelector } from "react-redux";
import SingleProduct from "./components/pages/SingleProduct";
import Checkout from "./components/pages/Checkout/Checkout";
function App() {
   const {access_token}=useSelector(state=>state.auth)
  return (
    <>
     <BrowserRouter>
     <Routes>
       
        <Route path="/" element={<Layout/>}>
          <Route index  element={<Home/>}/>
          <Route path="cart" element={<Cart/>}/>
          {/* <Route path="login" element={!access_token?<LoginReg/>:<Navigate to="/admin"/>}/> */}
          <Route path="login" element={<LoginReg/>}/>
          <Route path="registration" element={<Reg/>}/>
          {/* <Route path="admin/" element={access_token?<Admin/>:<Navigate to="/"/>}/>             */}
          <Route path="admin/" element={<Admin/>}/>  
          <Route path="edit/:id" element={<Edit/>}/>
          <Route path="singleProduct/:id" element={<SingleProduct/>}/>
          <Route path="add/" element={<AddProducts/>}/>
          <Route path="customer/" element={<CustomerPage/>}/>
          <Route path="checkout/" element={<Checkout/>}/>
          <Route path="order/" element={<ManageOrders/>}/>
          </Route> 
          
     </Routes> 
     </BrowserRouter>
    </>
  );
}

export default App;
