import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/auth/Login";

import AdminLayout from "./layouts/AdminLayout";
import InstructorLayout from "./layouts/InstructorLayout";

import DashboardHome from "./pages/components/DashboardHome";
import InstructorList from "./pages/admin/InstructorList";
import AddCourse from "./pages/admin/AddCourse";
import ScheduleLecture from "./pages/admin/ScheduleLecture";
import LectureListAdmin from "./pages/components/LectureList";

import InstructorLectures from "./pages/instructor/LectureList";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorLectureList from "./pages/instructor/LectureList";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="instructors" element={<InstructorList />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="schedule-lecture" element={<ScheduleLecture />} />
            <Route path="lectures" element={<LectureListAdmin />} />
          </Route>

          <Route path="/instructor" element={<InstructorLayout />}>
            <Route index element={<InstructorDashboard />} />
            <Route path="lectures" element={<InstructorLectureList />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
