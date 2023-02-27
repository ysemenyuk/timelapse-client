import axios from 'axios';
import { HOST } from '../utils/constants.js';
import getAuthHeader from './authHeader.js';

const instance = axios.create({
  baseURL: `${HOST}/api/cameras`,
});

const getAll = async () => {
  const response = await instance.get('?including=stats', { headers: getAuthHeader() });
  return response;
};

const getOne = async (cameraId) => {
  const response = await instance.get(`/${cameraId}`, { headers: getAuthHeader() });
  return response;
};

const getCameraStats = async (cameraId) => {
  const response = await instance.get(`/${cameraId}/stats`, { headers: getAuthHeader() });
  return response;
};

const createOne = async (data) => {
  const response = await instance.post('', data, { headers: getAuthHeader() });
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

export default {
  getAll,
  getOne,
  getCameraStats,
  createOne,
  updateOne,
  deleteOne,
};
