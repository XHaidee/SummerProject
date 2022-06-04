import { createSlice } from '@reduxjs/toolkit'

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
      }
      else{
      const tempProduct ={...action.payload,cartQuantity:1};
      state.cartItems.push(tempProduct)
      }
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },
  },
})

// Action creators are generated for each case reducer function
export const {  addToCart } = cartSlice.actions

export default cartSlice.reducer