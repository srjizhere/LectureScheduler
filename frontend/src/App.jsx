import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/auth/Login";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import InstructorLayout from "./layouts/InstructorLayout";

// Admin Pages
import DashboardHome from "./pages/components/DashboardHome"; // ✅ from components
import InstructorList from "./pages/admin/InstructorList";
import AddCourse from "./pages/admin/AddCourse";
import ScheduleLecture from "./pages/admin/ScheduleLecture";
import LectureListAdmin from "./pages/components/LectureList";

// Instructor Pages
import InstructorLectures from "./pages/instructor/LectureList";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Admin Layout */}
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="instructors" element={<InstructorList />} />
            <Route path="courses" element={<AddCourse />} />
            <Route path="schedule" element={<ScheduleLecture />} />
            <Route path="lectures" element={<LectureListAdmin />} />
          </Route>

          {/* Instructor Layout */}
          <Route path="/instructor" element={<InstructorLayout />}>
            <Route index element={<InstructorLectures />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
