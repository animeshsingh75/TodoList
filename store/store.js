import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducer";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
