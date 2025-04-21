import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Grid, Paper } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <Paper elevation={3} sx={{ p: 3, borderRadius: 4, display: "flex", alignItems: "center", gap: 2 }}>
    <Icon sx={{ fontSize: 40, color }} />
    <Box>
      <Typography variant="h6" fontWeight="bold">{value}</Typography>
      <Typography variant="body1" color="textSecondary">{label}</Typography>
    </Box>
  </Paper>
);

const InstructorDashboard = () => {
  const { lectures } = useSelector((state) => state.lectures);

  const totalLectures = lectures.length;
  const attendedLectures = lectures.filter((l) => l.attendanceStatus === "Attended").length;
  const notAttendedLectures = lectures.filter((l) => l.attendanceStatus !== "Attended").length;

  return (
    <Box>
      <Typography variant="h4" mb={4} fontWeight="bold">
        Instructor Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard icon={SchoolIcon} label="Total Lectures" value={totalLectures} color="#1976d2" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard icon={CheckCircleIcon} label="Attended Lectures" value={attendedLectures} color="green" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard icon={CancelIcon} label="Not Attended" value={notAttendedLectures} color="red" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InstructorDashboard;
