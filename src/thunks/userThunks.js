import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../api/user.service.js';

const singup = createAsyncThunk('user/singup', async (values) => {
  try {
    const { data } = await userService.singup(values);

    console.log('user/singup response.data -', data);

    return data;
  } catch (e) {
    console.log('user/singup error -', e.response.data);
    throw e.response.data;
  }
});

const login = createAsyncThunk('user/login', async (values) => {
  try {
    const { data } = await userService.login(values);

    console.log('user/login response.data -', data);

    const userInfo = {
      userId: data.user._id,
      token: data.token,
    };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    return data;
  } catch (e) {
    console.error('user/login error -', e.response.data);
    throw e.response.data;
  }
});

const tokenVerification = createAsyncThunk('user/tokenVerification', async () => {
  try {
    const { data } = await userService.tokenVerification();

    console.log('user/tokenVerification response.data -', data);

    const userInfo = {
      userId: data.user._id,
      token: data.token,
    };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    return data;
  } catch (e) {
    console.log('user/tokenVerification error -', e.response.data);
    localStorage.removeItem('userInfo');
    throw e.response.data;
  }
});

const uploadAvatar = createAsyncThunk('user/uploadAvatar', async ({ userId, formData }) => {
  try {
    const { data } = await userService.uploadAvatar(userId, formData);

    console.log('user/uploadAvatar response.data -', data);

    return data;
  } catch (e) {
    console.log('user/uploadAvatar response.data -', e.response.data);
    throw e.response.data;
  }
});

const deleteAvatar = createAsyncThunk('user/deleteAvatar', async ({ userId }) => {
  try {
    const { data } = await userService.deleteAvatar(userId);

    console.log('user/deleteAvatar response.data -', data);

    return data;
  } catch (e) {
    console.log('user/deleteAvatar response.data -', e.response.data);
    throw e.response.data;
  }
});

const updateOne = createAsyncThunk('user/updateOne', async ({ userId, values }) => {
  try {
    const { data } = await userService.updateOne(userId, values);

    console.log('user/updateOne response.data -', data);

    return data;
  } catch (e) {
    console.log('user/updateOne response.data -', e.response.data);
    throw e.response.data;
  }
});

export default {
  singup, login, tokenVerification, uploadAvatar, deleteAvatar, updateOne,
};
