import api from "./api";

export const getInstructors = async () => {
  const res = await api.get("/instructors"); // or ConstantData.INSTRUCTORS
  return res.data;
};

export const addInstructor = async (data) => {
  const res = await api.post("/instructors", data);
  return res.data;
};

export const updateInstructor = async (id, data) => {
  const res = await api.put(`/instructors/${id}`, data);
  return res.data;
};
