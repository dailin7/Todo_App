import { createSlice } from "@reduxjs/toolkit";
import { checkLogin, logout } from "./userAuthThunk";

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: false,
  reducers: {
    updateLogin: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkLogin.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { updateLogin } = userAuthSlice.actions;

export default userAuthSlice.reducer;
