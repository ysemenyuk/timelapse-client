import axios from 'axios';
import getAuthHeader from './authHeader.js';

const host = 'http://localhost:4000';

const instance = axios.create({
  baseURL: `${host}/api/cameras`,
});

const getFiles = async (cameraId, parentId) => {
  const response = await instance.get(`/${cameraId}/files?parentId=${parentId}`, { headers: getAuthHeader() });
  return response;
};

const getOneFile = async (cameraId, fileId) => {
  const response = await instance.get(`/${cameraId}/files/${fileId}`, { headers: getAuthHeader() });
  return response;
};

const deleteOneFile = async (cameraId, fileId) => {
  const response = await instance.delete(`/${cameraId}/files/${fileId}`, { headers: getAuthHeader() });
  return response;
};

export default {
  getFiles,
  getOneFile,
  deleteOneFile,
};
