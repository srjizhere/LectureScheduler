import axios from "axios";
import { ConstantData } from "../constants/constants";

const api = axios.create({
  baseURL: ConstantData.BASE_URL,
});

api.interceptors.request.use((config) => {
    debugger
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  
  if (token) {
    config.headers.type = user?.type;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
