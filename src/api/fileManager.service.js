import axios from 'axios';
import getAuthHeader from './authHeader.js';

const host = 'http://localhost:4000';

const instance = axios.create({
  baseURL: `${host}/api/cameras`,
});

const getAll = async (cameraId, query) => {
  const queryString = Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&');
  const response = await instance.get(`/${cameraId}/files?${queryString}`, { headers: getAuthHeader() });
  return response;
};

const getOneById = async (cameraId, id) => {
  const response = await instance.get(`/${cameraId}/files/${id}`, { headers: getAuthHeader() });
  return response;
};

const deleteOneById = async (cameraId, id) => {
  const response = await instance.delete(`/${cameraId}/files/${id}`, { headers: getAuthHeader() });
  return response;
};

export default {
  getAll,
  getOneById,
  deleteOneById,
};
