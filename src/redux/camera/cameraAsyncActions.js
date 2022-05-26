import { createAsyncThunk } from '@reduxjs/toolkit';
import cameraService from '../../api/camera.service.js';

const fetchAll = createAsyncThunk('camera/fetchAll', async () => {
  try {
    console.log('camera/fetchAll -');

    const { data } = await cameraService.getAll();
    console.log('camera/fetchAll response.data -', data);
    return data;
  } catch (e) {
    console.log('camera/fetchAll error -', e.message);
    throw e;
  }
});

const fetchOne = createAsyncThunk('camera/fetchOne', async (cameraId) => {
  try {
    console.log('camera/fetchOne cameraId -', cameraId);

    const { data } = await cameraService.getOne(cameraId);
    console.log('camera/fetchOne response.data -', data);
    return data;
  } catch (e) {
    console.log('camera/fetchOne error -', e.message);
    throw e;
  }
});

const createOne = createAsyncThunk('camera/createOne', async (values) => {
  try {
    console.log('camera/createOne values -', values);

    const { data } = await cameraService.createOne(values);
    console.log('createOne response.data -', data);
    return data;
  } catch (e) {
    console.log('camera/createOne error -', e.message);
    throw e;
  }
});

const updateOne = createAsyncThunk('camera/updateOne', async ({ cameraId, payload }) => {
  try {
    console.log('camera/updateOne camera, payload -', cameraId, payload);

    const { data } = await cameraService.updateOne(cameraId, payload);

    console.log('camera/updateOne response.data -', data);
    return data;
  } catch (e) {
    console.log('camera/updateOne error -', e.message);
    throw e;
  }
});

const deleteOne = createAsyncThunk('camera/deleteOne', async (camera) => {
  try {
    console.log('camera/deleteOne camera -', camera);

    const { data } = await cameraService.deleteOne(camera._id);

    console.log('camera/deleteOne response -', data);
    return camera;
  } catch (e) {
    console.log('camera/deleteOne error -', e.message);
    throw e;
  }
});

export default { fetchAll, fetchOne, createOne, updateOne, deleteOne };
