import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice.js";
import authReducer from "./authSlice.js";

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    auth: authReducer,
  },
});

export default store;
