import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../../api/task.service.js';

const fetchAll = createAsyncThunk('task/fetchAll', async ({ cameraId }) => {
  try {
    const { data } = await taskService.getAll(cameraId);
    console.log('task/fetchAll response.data -', data);
    return { cameraId, data };
  } catch (e) {
    console.log('task/fetchAll error -', e.message);
    throw e;
  }
});

const fetchOne = createAsyncThunk('task/fetchOne', async ({ cameraId, taskId }) => {
  try {
    const { data } = await taskService.getOne(cameraId, taskId);
    console.log('task/fetchOne response.data -', data);
    return { cameraId, taskId, data };
  } catch (e) {
    console.log('task/fetchOne error -', e.message);
    throw e;
  }
});

const createOne = createAsyncThunk('task/createOne', async ({ cameraId, payload }) => {
  try {
    // console.log('task/createOne payload -', payload);
    const { data } = await taskService.createOne(cameraId, payload);
    console.log('createOne response.data -', data);
    return { cameraId, data };
  } catch (e) {
    console.log('task/createOne error -', e.message);
    toast('task/createOne error');
    throw e;
  }
});

const updateOne = createAsyncThunk('task/updateOne', async ({ cameraId, taskId, payload }) => {
  try {
    // console.log('task/updateOne payload -', payload);
    const { data } = await taskService.updateOne(cameraId, taskId, payload);
    console.log('task/updateOne response.data -', data);
    return { cameraId, taskId, data };
  } catch (e) {
    console.log('task/updateOne error -', e.message);
    throw e;
  }
});

const deleteOne = createAsyncThunk('task/deleteOne', async ({ cameraId, taskId }) => {
  try {
    // console.log('task/deleteOne taskId -', taskId);
    const response = await taskService.deleteOne(cameraId, taskId);
    console.log('task/deleteOne response -', response);
    return { cameraId, taskId };
  } catch (e) {
    console.log('task/deleteOne error -', e.message);
    throw e;
  }
});

export default {
  createOne, updateOne, deleteOne, fetchAll, fetchOne,
};
