import { configureStore } from "@reduxjs/toolkit";
import instructorReducer from "./slices/instructorSlice";
import courseReducer from "./slices/courseSlice";
import lectureReducer from "./slices/lectureSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    instructors: instructorReducer,
    courses: courseReducer,
    lectures: lectureReducer,
  },
});

export default store;