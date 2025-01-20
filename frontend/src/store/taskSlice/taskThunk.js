import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
  const res = await fetch("http://localhost:3000/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
});
