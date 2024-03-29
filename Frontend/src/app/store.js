import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import counterReducer from '../features/counter/cartSlice'
import authReducer from '../features/authentication/authSlice'
import customerReducer from '../features/authentication/customerSlice'
export const store = configureStore({
  reducer: {
    //CART STATE
    counter: counterReducer,
    //JWT TOKEN STATE
    auth:authReducer,
    //CUSTOMER REDUCER
    customer:customerReducer,
    // RTK QUERY STATE
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)