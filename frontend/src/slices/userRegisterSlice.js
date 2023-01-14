import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const Register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    const body = data;
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/user`,
        data: body,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { data } = res;
      // localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;
const initialState = {
  status: "",
};
const userRegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerStatus(state, action) {
      state.status = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(Register.pending, (state) => {
        state.loading = true;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.loading = false;
        // Add any fetched products to the array
        state.status = true;
      })
      .addCase(Register.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        state.error =
          action.payload.error && action.error.message
            ? action.payload.error
            : action.error.message;
      });
  },
});
export const { registerStatus } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
