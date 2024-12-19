import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const login = createAsyncThunk("auth/login",async ({ email, password }, { rejectWithValue }) => {
    try {
      const users = await axios.get("https://fakestoreapi.com/users");
      const user = users.data.find((user) => user.email === email);

      if (!user) {
        return rejectWithValue("akun tidak ditemukan, periksa kembali email anda");
      }

      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username: user.username,
        password: password,
      });

      localStorage.setItem("token", response.data.token);
      return { token: response.data.token, user };
    } catch (error) {
      return rejectWithValue("Login gagal, password salah");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
