import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const initialState = {
  cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
  cartTotalQuantity:0,
  cartTotalAmount:0,
}

export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    addToCart: (state, action) => {
      const itemIndex=state.cartItems.findIndex(
        (item)=>item.id===action.payload.id
      );
      if(itemIndex>=0){
        state.cartItems[itemIndex].cartQuantity+=1;
        toast.info('product added',{position:"bottom-left",});
      }
      else{
      const tempProduct ={...action.payload,cartQuantity:1};
      state.cartItems.push(tempProduct)
      }
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },

    removeFormCart:(state,action)=>{
        const nextCartItems=state.cartItems.filter(
          cartItem=>cartItem.id!==action.payload.id
        )
        state.cartItems=nextCartItems ;
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        toast.error('removed item',
        {
          position:"top-right"
        });
    } ,
    decreaseCart(state,action){
      const itemIndex=state.cartItems.findIndex(
        (cartItem)=>cartItem.id === action.payload.id
      )
      if(state.cartItems[itemIndex].cartQuantity>1){
        state.cartItems[itemIndex].cartQuantity-=1
      }
      else if(state.cartItems[itemIndex].cartQuantity===1){
        const nextCartItems=state.cartItems.filter(
          cartItem=>cartItem.id!==action.payload.id
        )
        state.cartItems=nextCartItems ;
        
        toast.error("cart item removed",
        {
          position:"top-right"
        });
      }
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    }, 
  clearCart(state,action){
    state.cartItems=[];
    localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
  },
  getTotals(state,action){
   let{total,quantity}=state.cartItems.reduce(
     (cartTotal,cartItem)=>{
       const {price,cartQuantity}=cartItem;
       const itemTotal=price*cartQuantity;
       cartTotal.total+=itemTotal;
       cartTotal.quantity+=cartQuantity;
       return cartTotal;
     },
     {
       total:0,
       quantity:0,
     }
   );
    state.cartTotalQuantity=quantity;
    state.cartTotalAmount=total;
  },
  },
});

// Action creators are generated for each case reducer function
export const {  addToCart ,removeFormCart,decreaseCart,clearCart,getTotals } = cartSlice.actions

export default cartSlice.reducer