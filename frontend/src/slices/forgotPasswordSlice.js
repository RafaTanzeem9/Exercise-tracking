import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// export const userLogin = createAsyncThunk(
//   "user/login",
//   async (user, { rejectWithValue }) => {
//     const { email, password } = user;
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const res = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/user/login`,
//         {
//           email,
//           password,
//         },
//         config
//       );
//       const { data } = res;
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       return data;
//     } catch (err) {
//       console.log(err);
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (user, { rejectWithValue }) => {
    const { email } = user;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/forgotPassword`,
        {
          email,
        },
        config
      );
      const { data } = res;
      console.log(data);
      alert(data.message);
      return data.token;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (user, { rejectWithValue }) => {
    const { email, password } = user;
    try {
      const token = localStorage.getItem("userInfo")
        ? localStorage.getItem("userInfo")
        : null;
      console.log(token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/resetPassword`,
        {
          email,
          password,
        },
        config
      );
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : false;
const initialState = {
  userInfo: userInfoFromStorage,
};
const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.userInfo = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.error && action.error.message
            ? action.payload.error
            : action.error.message;
      });
  },
});

export default forgotPasswordSlice.reducer;
