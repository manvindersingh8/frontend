import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice.js";
import authReducer from "./authSlice.js";
import applicantReducer from "./applicantsSlice.js";
const store = configureStore({
  reducer: {
    jobs: jobReducer,
    auth: authReducer,
    applicants: applicantReducer,
  },
});

export default store;
