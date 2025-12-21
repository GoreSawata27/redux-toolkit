import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fakeLoginApi = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@test.com" && password === "1234") {
        resolve({ token: "fake_jwt_token_123" });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

const fakeUserDetailsApi = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "John Doe",
        email: "test@test.com",
      });
    }, 1000);
  });
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginResponse = await fakeLoginApi({ email, password });

      const userDetails = await fakeUserDetailsApi(loginResponse.token);

      return {
        token: loginResponse.token,
        user: userDetails,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
