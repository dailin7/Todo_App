import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkLogin = createAsyncThunk("userAuth/checkLogin", async () => {
  const res = await fetch("http://localhost:3000/user/checkLogin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return "isLoggedIn" in data;
});

export const logout = createAsyncThunk("userAuth/logout", async () => {
  const res = await fetch("http://localhost:3000/user/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`error logging out`);
  }
  return false;
});
