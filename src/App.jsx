import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../frontend/src/redux/store";
import Login from "../frontend/src/pages/auth/Login";

// Layouts
import AdminLayout from "../frontend/src/layouts/AdminLayout";
import InstructorLayout from "../frontend/src/layouts/InstructorLayout";

// Admin Pages
import DashboardHome from "../frontend/src/pages/components/DashboardHome"; // ✅ from components
import InstructorList from "../frontend/src/pages/admin/InstructorList";
import AddCourse from "../frontend/src/pages/admin/AddCourse";
import ScheduleLecture from "../frontend/src/pages/admin/ScheduleLecture";
import LectureListAdmin from "../frontend/src/pages/components/LectureList";

// Instructor Pages
import InstructorLectures from "../frontend/src/pages/instructor/LectureList";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Admin Layout */}
          <Route path="/" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="instructors" element={<InstructorList />} />
            <Route path="courses" element={<AddCourse />} />
            <Route path="schedule" element={<ScheduleLecture />} />
            <Route path="lectures" element={<LectureListAdmin />} />
          </Route>

          {/* Instructor Layout */}
          <Route
            path="/instructor"
            element={
              <PrivateRoute role="instructor">
                <InstructorLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<InstructorLectures />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
