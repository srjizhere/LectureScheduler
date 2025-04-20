// src/services/instructorService.js
import axios from "axios";
import {ConstantData} from '../constants/constants.js'

const API = `${ConstantData.endPoint}/api/instructors`;

export const getInstructors = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const addInstructor = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateInstructor = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};
