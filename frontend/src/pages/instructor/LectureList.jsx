import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  CircularProgress,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchLectures } from "../../redux/slices/lectureSlice";
import { fetchCourses } from "../../redux/slices/courseSlice";

const InstructorLectureList = () => {
  const dispatch = useDispatch();
  const { lectures, loading } = useSelector((state) => state.lectures);
  
  const { courses } = useSelector((state) => state.courses);

  const [filterCourse, setFilterCourse] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedLecture, setSelectedLecture] = useState(null); // To hold the selected lecture
  const [openDialog, setOpenDialog] = useState(false); // To control dialog visibility

  useEffect(() => {
    dispatch(fetchLectures());
    dispatch(fetchCourses());
  }, [dispatch]);

  const getCourseName = (id) => {
    const course = courses.find((c) => c._id === id);
    return course ? course.name : "Unknown";
  };

  const filteredLectures = lectures.filter(
    (lecture) =>
      (filterCourse === "" || lecture.course._id === filterCourse) &&
      (filterStatus === "" || lecture.attendanceStatus === filterStatus)
  );

  const handleViewClick = (lecture) => {
    setSelectedLecture(lecture); // Set the selected lecture
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
    setSelectedLecture(null); // Clear the selected lecture
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        My Lectures
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          select
          label="Filter by Course"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {courses.map((course) => (
            <MenuItem key={course._id} value={course._id}>
              {course.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Filter by Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Attended">Attended</MenuItem>
          <MenuItem value="Not Attended">Not Attended</MenuItem>
        </TextField>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLectures.map((lecture) => (
                <TableRow key={lecture._id}>
                  <TableCell>{lecture?.course?.name}</TableCell>
                  <TableCell>{lecture.date}</TableCell>
                  <TableCell>{lecture.time}</TableCell>
                  <TableCell>{lecture.duration} min</TableCell>
                  <TableCell>{lecture.attendanceStatus || "Not Attended"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleViewClick(lecture)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog to show course details */}
      <Dialog open={openDialog}  sx={{ "& .MuiDialog-paper": { width: "100%", maxWidth: "1000px" } }} onClose={handleCloseDialog}>
        <DialogTitle>Lecture Details</DialogTitle>
        <DialogContent dividers>
  {selectedLecture ? (
    <Box>
      <Typography variant="h6" gutterBottom>
        Course Details
      </Typography>
      <Typography variant="body1"><strong>Name:</strong> {selectedLecture.course.name}</Typography>
      <Typography variant="body1"><strong>Level:</strong> {selectedLecture.course.level}</Typography>
      <Typography variant="body1" gutterBottom><strong>Description:</strong> {selectedLecture.course.description}</Typography>

      {selectedLecture.course.image && (
        <Box mb={2}>
          <img
            src={selectedLecture.course.image}
            alt="Course"
            style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
          />
        </Box>
      )}

{selectedLecture.course.lectures?.length > 0 && (
  <Box mb={2}>
    <Typography variant="subtitle1" gutterBottom>
      Lecture Videos
    </Typography>
    <ul style={{ marginTop: 0 }}>
      {selectedLecture.course.lectures.map((lec) => (
        <li key={lec._id}>
          <Typography variant="body2">
            <strong>Title:</strong> {lec.title}
          </Typography>
          {lec.video && (
            <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
              <strong>URL:</strong>{" "}
              <a href={lec.video} target="_blank" rel="noopener noreferrer">
                {lec.video}
              </a>
            </Typography>
          )}
        </li>
      ))}
    </ul>
  </Box>
)}


      <Typography variant="h6" gutterBottom>
        Scheduled Lecture Info
      </Typography>
      <Typography variant="body1"><strong>Date:</strong> {selectedLecture.date}</Typography>
      <Typography variant="body1"><strong>Time:</strong> {selectedLecture.time}</Typography>
      <Typography variant="body1"><strong>Duration:</strong> {selectedLecture.duration} min</Typography>
      <Typography variant="body1">
        <strong>Status:</strong> {selectedLecture.attendanceStatus || "Not Attended"}
      </Typography>
    </Box>
  ) : (
    <Typography variant="body1">No details available.</Typography>
  )}
</DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InstructorLectureList;
