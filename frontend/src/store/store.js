import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice/taskSlice";
import userAuthReducer from "./userAuthSlice/userAuthSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
    userAuth: userAuthReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
