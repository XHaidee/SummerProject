import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  customer:{},
}

export const authSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
   setCustomer:(state,action)=>{
       state.customer=action.payload.data
   },

  },
})

// Action creators are generated for each case reducer function
export const { setCustomer } = authSlice.actions

export default authSlice.reducer