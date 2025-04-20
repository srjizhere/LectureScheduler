import axios from "axios";
import {ConstantData} from '../constants/constants.js'
const API = `${ConstantData.endPoint}/api/lectures`;

export const getLectures = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const scheduleLecture = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};
