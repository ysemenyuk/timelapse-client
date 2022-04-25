import axios from 'axios';
import getAuthHeader from './authHeader.js';

const host = 'http://localhost:4000';

const instance = axios.create({
  baseURL: `${host}/api/cameras`,
});

const getAll = async () => {
  const response = await instance.get('/', { headers: getAuthHeader() });
  return response;
};

const getOne = async (cameraId, taskId) => {
  const response = await instance.get(`${cameraId}/tasks/${taskId}`, { headers: getAuthHeader() });
  return response;
};

const createOne = async (cameraId, data) => {
  const response = await instance.post(`/${cameraId}/tasks`, data, { headers: getAuthHeader() });
  return response;
};

const updateOne = async (cameraId, data) => {
  const response = await instance.put(`/${cameraId}/tasks`, data, { headers: getAuthHeader() });
  return response;
};

const deleteOne = async (cameraId, taskId) => {
  const response = await instance.delete(`/${cameraId}/tasks/${taskId}`, { headers: getAuthHeader() });
  return response;
};

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
