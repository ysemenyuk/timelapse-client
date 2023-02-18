import axios from 'axios';
import { HOST } from '../utils/constants.js';
import getAuthHeader from './authHeader.js';

const instance = axios.create({
  baseURL: `${HOST}/api/users`,
});

const singup = async (data) => {
  const response = await instance.post('/singup', data);
  return response;
};
const login = async (data) => {
  const response = await instance.post('/login', data);
  return response;
};

const tokenVerification = async () => {
  const response = await instance.get('/auth', { headers: getAuthHeader() });
  return response;
};

const updateOne = async (userId, data) => {
  const response = await instance.put(`/${userId}`, data, { headers: getAuthHeader() });
  return response;
};

export default {
  singup,
  login,
  tokenVerification,
  updateOne,
};
