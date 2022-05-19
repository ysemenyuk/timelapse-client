import axios from 'axios';
import getAuthHeader from './authHeader.js';

const host = 'http://localhost:4000';

const instance = axios.create({
  baseURL: `${host}/api/cameras`,
});

// const getAll = async (cameraId) => {
//   const response = await instance.get(`${cameraId}/tasks`, { headers: getAuthHeader() });
//   return response;
// };

// const getOne = async (cameraId, taskId) => {
//   const response = await instance.get(`${cameraId}/tasks/${taskId}`, { headers: getAuthHeader() });
//   return response;
// };

// const createOne = async (cameraId, data) => {
//   const response = await instance.post(`/${cameraId}/tasks`, data, { headers: getAuthHeader() });
//   return response;
// };

// const updateOne = async (cameraId, taskId, data) => {
//   const response = await instance.put(`/${cameraId}/tasks/${taskId}`, data, { headers: getAuthHeader() });
//   return response;
// };

// const deleteOne = async (cameraId, taskId) => {
//   const response = await instance.delete(`/${cameraId}/tasks/${taskId}`, { headers: getAuthHeader() });
//   return response;
// };

const createScreenshotTask = async (cameraId, data = {}) => {
  const response = await instance.post(`/${cameraId}/tasks/screenshot`, data, { headers: getAuthHeader() });
  return response;
};

const updateScreenshotsByTimeTask = async (cameraId, taskId, data) => {
  const response = await instance
    .put(`/${cameraId}/tasks/${taskId}/screenshotsByTime`, data, { headers: getAuthHeader() });
  return response;
};

const createVideoFileTask = async (cameraId, data) => {
  const response = await instance.post(`/${cameraId}/tasks/video`, data, { headers: getAuthHeader() });
  return response;
};

const updateVideosByTimeTask = async (cameraId, taskId, data) => {
  const response = await instance
    .put(`/${cameraId}/tasks/${taskId}/videosByTime`, data, { headers: getAuthHeader() });
  return response;
};

export default {
  // getAll,
  // getOne,
  // createOne,
  // updateOne,
  // deleteOne,
  createScreenshotTask,
  updateScreenshotsByTimeTask,
  createVideoFileTask,
  updateVideosByTimeTask,
};
