import {BrowserRouter, Route, Routes} from "react-router-dom"; 
import Contact from "./components/pages/Contact";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/Home"
import LoginReg from "./components/pages/auth/LoginReg";
import Reg from "./components/pages/auth/Reg";
import Edit from "./components/pages/admin/adminCoponents/operation/Edit";
import AddProducts from "./components/pages/admin/adminCoponents/operation/AddProducts";
import Admin from "./components/pages/admin/Admin";
import ManageProduct from "./components/pages/admin/adminCoponents/ManageProduct";
import Cart from "./components/pages/cart/Cart";
import X from "./components/pages/admin/adminCoponents/operation/X";
function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index  element={<Home/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="login" element={<LoginReg/>}/>
          <Route path="registration" element={<Reg/>}/>
       </Route> 
          <Route path="admin/" element={<Admin/>}/>            
          <Route path="edit/:id" element={<Edit/>}/>
          <Route path="add/" element={<AddProducts/>}/>
          <Route path="x/" element={<X/>}/>
          
     </Routes> 
     </BrowserRouter>
    </>
  );
}

export default App;
