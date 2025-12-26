import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type loginData = {
  email: string;
  password: string;
};

const login = async ({ email, password }: loginData) => {
  const payload = { email, password };
  const res = await axios.post("http://localhost:3000/api/auth/login", payload);
  return res.data;
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: loginData, { rejectWithValue }) => {
    try {
      const apiRes = await login({ email, password });

      return {
        token: apiRes.token,
        user: apiRes.user,
      };
    } catch (err) {
      return rejectWithValue("Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    token: null,
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
