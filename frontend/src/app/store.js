import { configureStore } from "@reduxjs/toolkit";
import forgotPasswordSlice from "../slices/forgotPasswordSlice";
import userLoginSlice from "../slices/userLoginSlice";
import userRegisterSlice from "../slices/userRegisterSlice";
export const store = configureStore({
  reducer: {
    user: userLoginSlice,
    userRegister: userRegisterSlice,
    forgotPassword: forgotPasswordSlice,
  },
});
