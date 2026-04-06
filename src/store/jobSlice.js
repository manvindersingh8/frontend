import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../services/axios.js";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchjobs",
  async ({ search, page }, thunkAPI) => {
    try {
      const url = search
        ? `/jobs?search=${search}&page=${page}&limit=20`
        : `/jobs?page=${page}&limit=20`;
      const result = await API.get(url);
      console.log(result);
      return result.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "something went wrong",
      );
    }
  },
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    errors: null,
    currentPage: 1,
    totalJobs: 0,
    totalPage: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        ((state.loading = true), (state.errors = null));
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        console.log(state.payload);
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.currentPage = action.payload.currentPage;
        state.totalJobs = action.payload.totalJobs;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        ((state.loading = false), (state.errors = action.payload));
      });
  },
});

export default jobSlice.reducer;
