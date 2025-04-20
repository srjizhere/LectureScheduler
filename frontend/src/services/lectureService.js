import api from "./api";



export const getLectures = async () => {
  const res = await api.get("/lectures");
  return res.data;
};

export const scheduleLecture = async (data) => {
  const res = await api.post("/lectures", data);
  return res.data;
};
export const deleteLecture = async (id) => {
  const res = await api.delete(`/lectures/${id}`);
  return res.data;
}

