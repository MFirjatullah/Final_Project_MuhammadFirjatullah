import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slice'
import authReducer from './authSlice'



export const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer,
        
    }
})