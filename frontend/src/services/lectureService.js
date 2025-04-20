import axios from "axios";

const API = "http://localhost:5000/api/lectures";

export const getLectures = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const scheduleLecture = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};
