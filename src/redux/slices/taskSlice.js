import { createSlice, createSelector } from '@reduxjs/toolkit';
import taskAsyncActions from '../asyncActions/taskAsyncActions.js';

const { fetchAll, createScreenshot, createVideoFile, updateScreenshotsByTime, updateVideosByTime } = taskAsyncActions;

// console.log("cameraSlice");

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: {},
  },
  reducers: {
    selectCamera: (state, action) => {
      state.selectedCameraId = action.payload;
    },
  },
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      console.log('fetchAll.fulfilled action -', action);

      const { cameraId, data } = action.payload;
      state.tasks[cameraId] = data;
    },
    [createScreenshot.fulfilled]: (state, action) => {
      console.log('createScreenshot.fulfilled action -', action);

      const { cameraId, data } = action.payload;
      state.tasks[cameraId].push(data);
    },
    [createVideoFile.fulfilled]: (state, action) => {
      console.log('createScreenshot.fulfilled action -', action);

      const { cameraId, data } = action.payload;
      state.tasks[cameraId].push(data);
    },
    [updateScreenshotsByTime.fulfilled]: (state, action) => {
      console.log('updateScreenshotByTime.fulfilled action -', action);

      const { cameraId, taskId, data } = action.payload;
      const index = state.tasks[cameraId].findIndex((task) => task._id === taskId);
      state.tasks[cameraId][index] = data;
    },
    [updateVideosByTime.fulfilled]: (state, action) => {
      console.log('updateVideosByTime.fulfilled action -', action);

      const { cameraId, taskId, data } = action.payload;
      const index = state.tasks[cameraId].findIndex((task) => task._id === taskId);
      state.tasks[cameraId][index] = data;
    },
  },
});

const camerasById = (state) => state.camera.cameras;
const selectedCameraId = (state) => state.camera.selectedCameraId;

const selectedCamera = createSelector(
  camerasById,
  selectedCameraId,
  (cameras, id) => cameras[id] || null,
);

const tasksByCameraId = (state) => state.task.tasks;

const cameraTasks = createSelector(
  tasksByCameraId,
  selectedCameraId,
  (tasks, cameraId) => tasks[cameraId] || null,
);

const screenshotsByTimeTask = createSelector(
  cameraTasks,
  selectedCamera,
  (tasks, camera) => tasks && tasks.find((task) => task._id === camera.screenshotsByTimeTask),
);

const videosByTimeTask = createSelector(
  cameraTasks,
  selectedCamera,
  (tasks, camera) => tasks && tasks.find((task) => task._id === camera.videosByTimeTask),
);

const createScreenshotTask = createSelector(
  cameraTasks,
  selectedCamera,
  (tasks, camera) => tasks && tasks.find((task) => task._id === camera.createScreenshotTask),
);

const createVideoTask = createSelector(
  cameraTasks,
  selectedCamera,
  (tasks, camera) => tasks && tasks.find((task) => task._id === camera.videosByTimeTask),
);

export const taskSelectors = {
  cameraTasks, screenshotsByTimeTask, videosByTimeTask, createScreenshotTask, createVideoTask,
};

export const taskActions = { ...taskSlice.actions, ...taskAsyncActions };

export default taskSlice.reducer;

// const cameraTasks = tasks[selectedCamera._id];
// const screenshotsByTimeTask = cameraTasks.find((task) => task._id === selectedCamera.screenshotsByTimeTask._id);
// const videosByTimeTask = cameraTasks.find((task) => task._id === selectedCamera.videosByTimeTask._id);
// const runningTasks = cameraTasks.filter((task) => task.status === 'Running');
