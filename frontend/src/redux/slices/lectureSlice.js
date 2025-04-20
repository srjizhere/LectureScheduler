
// src/redux/slices/lectureSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLectures, scheduleLecture } from "../../services/lectureService";

export const fetchLectures = createAsyncThunk(
  "lectures/fetchAll",
  async () => await getLectures()
);

const lectureSlice = createSlice({
  name: "lectures",
  initialState: {
    lectures: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLectures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLectures.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
      })
      .addCase(fetchLectures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default lectureSlice.reducer;