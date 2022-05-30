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
    return data;
  } catch (e) {
    console.log('task/fetchOne error -', e.message);
    throw e;
  }
});

// const createOne = createAsyncThunk('task/createOne', async (values) => {
//   try {
//     console.log('task/createOne values -', values);

//     const { data } = await taskService.createOne(values);

//     console.log('createOne response.data -', data);
//     return data;
//   } catch (e) {
//     console.log('task/createOne error -', e.message);
//     throw e;
//   }
// });

// const updateOne = createAsyncThunk('task/updateOne', async (values) => {
//   try {
//     console.log('task/updateOne values -', values);

//     const { data } = await taskService.updateOne(values._id, values);

//     console.log('task/updateOne response.data -', data);
//     return data;
//   } catch (e) {
//     console.log('task/updateOne error -', e.message);
//     throw e;
//   }
// });

// const deleteOne = createAsyncThunk('task/deleteOne', async (task) => {
//   try {
//     console.log('task/deleteOne camera -', task);

//     const { data } = await taskService.deleteOne(task._id);

//     console.log('task/deleteOne response -', data);
//     return task;
//   } catch (e) {
//     console.log('task/deleteOne error -', e.message);
//     throw e;
//   }
// });

const createVideoFile = createAsyncThunk('task/createVideoFile', async ({ cameraId, payload }) => {
  try {
    console.log('task/createVideoFile cameraId -', cameraId);

    const { data } = await taskService.createVideoFileTask(cameraId, payload);

    console.log('task/createVideoFile response -', data);
    return { cameraId, data };
  } catch (e) {
    console.log('task/createVideoFile error -', e.message);
    throw e;
  }
});

const createScreenshot = createAsyncThunk('task/createScreenshot', async ({ cameraId, payload }) => {
  try {
    console.log('task/createScreenshot cameraId -', cameraId);

    const { data } = await taskService.createScreenshotTask(cameraId, payload);

    console.log('task/createScreenshot response -', data);
    toast('task/createScreenshot successed');

    return { cameraId, data };
  } catch (e) {
    console.log('task/createScreenshot error -', e.message);
    toast('task/createScreenshot failed');

    throw e;
  }
});

// eslint-disable-next-line max-len
const updateScreenshotsByTime = createAsyncThunk('task/updateScreenshotsByTime', async ({ cameraId, taskId, payload }) => {
  try {
    console.log('task/updateScreenshotsByTime cameraId -', cameraId);

    const { data } = await taskService.updateScreenshotsByTimeTask(cameraId, taskId, payload);

    console.log('task/updateScreenshotsByTime response -', data);
    return { cameraId, taskId, data };
  } catch (e) {
    console.log('task/updateScreenshotsByTime error -', e.message);
    throw e;
  }
});

const updateVideosByTime = createAsyncThunk('task/updateVideosByTime', async ({ cameraId, taskId, payload }) => {
  try {
    console.log('task/updateVideosByTime cameraId -', cameraId);

    const { data } = await taskService.updateVideosByTimeTask(cameraId, taskId, payload);

    console.log('task/updateVideosByTime response -', data);
    return { cameraId, taskId, data };
  } catch (e) {
    console.log('task/updateVideosByTime error -', e.message);
    throw e;
  }
});

export default {
  //  createOne, updateOne, deleteOne,
  fetchAll, fetchOne, createVideoFile, createScreenshot, updateScreenshotsByTime, updateVideosByTime,
};
