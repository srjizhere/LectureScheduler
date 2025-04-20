
// src/redux/slices/instructorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getInstructors,
  addInstructor,
  updateInstructor,
} from "../../services/instructorService";

export const fetchInstructors = createAsyncThunk(
  "instructors/fetchAll",
  async () => await getInstructors()
);

const instructorSlice = createSlice({
  name: "instructors",
  initialState: {
    instructors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructors.fulfilled, (state, action) => {
        state.loading = false;
        state.instructors = action.payload;
      })
      .addCase(fetchInstructors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default instructorSlice.reducer;
