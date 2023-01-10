import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const RegisterUser = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    const { firstName, lastName, email, password } = user;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `http://localhost:8081/api/user`,
        { firstName, lastName, email, password },
        config
      );
      const data = res.data;
      console.log(data);
      //   localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  data: {},
  loading: false,
  err: {},
};

export const userSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload.data
          ? action.payload.error
          : action.error.message;
      });
  },
});
// export const {} = userSlice.actions;

export default userSlice.reducer;
