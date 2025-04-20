import api from "./api";

export const getCourses = async () => {
  const res = await api.get("/courses");
  return res.data;
};

export const createCourse = async (data) => {
  const res = await api.post("/courses", data);
  return res.data;
};