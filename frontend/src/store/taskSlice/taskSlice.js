import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "./taskThunk";

const initialState = {};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    updateTask: (state, action) => {
      return { ...state, [action.payload._id]: action.payload };
    },
    deleteTask: (state, action) => {
      const copy = { ...state };
      delete copy[action.payload];
      return copy;
    },
    clearTask: (state, action) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      action.payload.forEach((task) => {
        state[task["_id"]] = task;
      });
    });
  },
});

export const { deleteTask, updateTask, clearTask } = taskSlice.actions;

export default taskSlice.reducer;
