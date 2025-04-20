
// src/redux/slices/courseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCourses, createCourse } from "../../services/courseService";

export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async () => await getCourses()
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;
