import axios from "axios";

const API = "http://localhost:5000/api/courses";

export const getCourses = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createCourse = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};