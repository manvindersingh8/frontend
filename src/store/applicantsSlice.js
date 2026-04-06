import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../services/axios";

export const fetchApplicants = createAsyncThunk(
  "application/fetchApplicants",
  async (jobId, thunkAPI) => {
    try {
      const result = await API.get(`/applications?jobId=${jobId}`);
      return result.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  },
);

export const updateApplicantStatus = createAsyncThunk(
  "application/updateStatus",
  async ({ jobId, applicantId, status }, thunkAPI) => {
    try {
      await API.patch(`/applications/${applicantId}/status`, {
        jobId,
        applicantId,
        status,
      });
      return { applicantId, status };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  },
);

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applicants: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.applicants = action.payload;
      })
      .addCase(fetchApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateApplicantStatus.fulfilled, (state, action) => {
        const { applicantId, status } = action.payload;
        const app = state.applicants.find(
          (a) => a.applicantId._id === applicantId,
        );
        if (app) app.status = status;
      });
  },
});

export default applicationSlice.reducer;
