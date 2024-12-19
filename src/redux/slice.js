import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [], 
    cart: [], 
};


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find((p) => p.id === id);
    
      if (product) {
        const cartItem = state.cart.find((item) => item.id === id);
        if (cartItem) {
          cartItem.quantity += quantity;
        } else {
          state.cart.push({ ...product, quantity });
        }
      }
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const cartItem = state.cart.find((item) => item.id === id);
      const product = state.products.find((p) => p.id === id);

      if (cartItem && product && cartItem.quantity < product.stock) {
        cartItem.quantity += 1;
      }
    },

     decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const cartItem = state.cart.find((item) => item.id === id);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
  },

  checkOut: (state) => {
    state.cart.forEach((cartItem) => {
        const product = state.products.find((p) => p.id === cartItem.id);
        if (product) {
            product.stock -= cartItem.quantity;
        }
    });
    state.cart = [];
},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

   export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
     const response = await axios.get("https://fakestoreapi.com/products");
     const data = response.data;
     return data.map((product) => ({
         ...product,
         stock: 20, 
     }));
   });

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart ,checkOut } = productSlice.actions;
export default productSlice.reducer;
