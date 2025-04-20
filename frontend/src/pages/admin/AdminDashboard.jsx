// src/pages/AdminDashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import DrawerLayout from "../components/drawer/DrawerLayout";
import DashboardHome from "../components/DashboardHome";
import AddCourse from "../components/AddCourse";
import InstructorList from "../admin/InstructorList";
import ScheduleLecture from "../components/ScheduleLecture.jsx";
import LectureList from "../components/LectureList";

const AdminDashboard = () => {
  return (
    <DrawerLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/instructors" element={<InstructorList />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/schedule-lecture" element={<ScheduleLecture />} />
        <Route path="/lectures" element={<LectureList />} />
      </Routes>
    </DrawerLayout>
  );
};

export default AdminDashboard;
