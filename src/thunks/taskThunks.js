import { createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../api/task.service.js';

// const fetchAll = createAsyncThunk('task/fetchAll', async () => {
//   try {
//     const { data } = await taskService.getAll();
//     console.log('task/fetchAll response.data -', data);
//     return data;
//   } catch (e) {
//     console.log('task/fetchAll error -', e.message);
//     throw e;
//   }
// });

// const fetchOne = createAsyncThunk('task/fetchOne', async (id) => {
//   try {
//     const { data } = await taskService.getOne(id);
//     console.log('task/fetchOne response.data -', data);
//     return data;
//   } catch (e) {
//     console.log('task/fetchOne error -', e.message);
//     throw e;
//   }
// });

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

const createScreenshot = createAsyncThunk('task/createScreenshotTask', async ({ cameraId }) => {
  try {
    console.log('task/createScreenshot cameraId -', cameraId);

    const { data } = await taskService.createScreenshotTask(cameraId);

    console.log('task/createScreenshot response -', data);
    return data;
  } catch (e) {
    console.log('task/createScreenshot error -', e.message);
    throw e;
  }
});

// eslint-disable-next-line max-len
const updateScreenshotByTime = createAsyncThunk('task/updateScreenshotByTimeTask', async ({ cameraId, taskId, payload }) => {
  try {
    console.log('task/updateScreenshotByTimeTask cameraId -', cameraId);

    const { data } = await taskService.updateScreenshotByTimeTask(cameraId, taskId, payload);

    console.log('task/updateScreenshotByTimeTask response -', data);
    return data;
  } catch (e) {
    console.log('task/updateScreenshotByTimeTask error -', e.message);
    throw e;
  }
});

export default {
  // fetchAll, fetchOne, createOne, updateOne, deleteOne,
  createScreenshot, updateScreenshotByTime,
};
