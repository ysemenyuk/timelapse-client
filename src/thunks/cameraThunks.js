import { createAsyncThunk } from '@reduxjs/toolkit';
import cameraService from '../api/camera.service.js';

const fetchAll = createAsyncThunk('camera/fetchAll', async () => {
  try {
    const { data } = await cameraService.getAll();
    console.log('camera/fetchAll response.data -', data);
    return data;
  } catch (e) {
    console.log('camera/fetchAll error -', e.message);
    throw e;
  }
});

const fetchOne = createAsyncThunk('camera/fetchOne', async (id) => {
  try {
    const { data } = await cameraService.getOne(id);
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

const updateOne = createAsyncThunk('camera/updateOne', async (values) => {
  try {
    console.log('camera/updateOne values -', values);

    const { data } = await cameraService.updateOne(values._id, values);

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

const createScreenshot = createAsyncThunk('file/createScreenshot', async ({ cameraId, parentId }) => {
  try {
    console.log('file/createScreenshot cameraId, parentId -', cameraId, parentId);

    const { data } = await cameraService.createScreenshot(cameraId, parentId);

    console.log('file/createScreenshot response -', data);
    return data;
  } catch (e) {
    console.log('file/createScreenshot error -', e.message);
    throw e;
  }
});

export default { fetchAll, fetchOne, createOne, updateOne, deleteOne, createScreenshot };
