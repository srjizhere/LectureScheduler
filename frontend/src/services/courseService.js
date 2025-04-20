import axios from "axios";
import {ConstantData} from '../constants/constants.js'

const API = `${ConstantData.endPoint}/api/courses`;

export const getCourses = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createCourse = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};