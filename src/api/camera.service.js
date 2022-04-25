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

const getOne = async (cameraId) => {
  const response = await instance.get(`/${cameraId}`, { headers: getAuthHeader() });
  return response;
};

const createOne = async (data) => {
  const response = await instance.post('/', data, { headers: getAuthHeader() });
  return response;
};

const updateOne = async (cameraId, data) => {
  const response = await instance.put(`/${cameraId}`, data, { headers: getAuthHeader() });
  return response;
};

const deleteOne = async (cameraId) => {
  const response = await instance.delete(`/${cameraId}`, { headers: getAuthHeader() });
  return response;
};

const createScreenshot = async (cameraId, parentId) => {
  const response = await instance.post(`/${cameraId}/screenshot`, { parentId }, { headers: getAuthHeader() });
  return response;
};

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  createScreenshot,
};
