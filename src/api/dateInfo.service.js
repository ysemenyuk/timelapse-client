import axios from 'axios';
import { HOST } from '../utils/constants.js';
import getAuthHeader from './authHeader.js';

const instance = axios.create({
  baseURL: `${HOST}/api/cameras`,
});

const getAll = async ({ cameraId, query }) => {
  const queryString = Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&');
  const response = await instance.get(`/${cameraId}/date-info?${queryString}`, { headers: getAuthHeader() });
  return response;
};

const getOne = async ({ cameraId, date }) => {
  const response = await instance.get(`/${cameraId}/date-info/${date}`, { headers: getAuthHeader() });
  // console.log(222, response.data);
  return response;
};

export default {
  getAll,
  getOne,
};
