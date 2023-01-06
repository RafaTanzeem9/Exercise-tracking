import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state) => {},
  },
});
// export const {} = userSlice.actions;

export default userSlice.reducer;
