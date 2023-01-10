import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userRegisterSlice";

export const store = configureStore({
  reducer: {
    register: userReducer,
  },
});
