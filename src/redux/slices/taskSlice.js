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
    },
    [updateScreenshotsByTime.fulfilled]: (state, action) => {
      console.log('updateScreenshotByTime.fulfilled action -', action);
      // const updatedTask = action.payload;
      // const camera = state.cameras[updatedTask.camera];
      // camera.screenshotsByTimeTask = updatedTask;
    },
    [updateVideosByTime.fulfilled]: (state, action) => {
      console.log('updateVideosByTime.fulfilled action -', action);
    },
  },
});

const tasksByCameraId = (state) => state.task.tasks;
const selectedCameraId = (state) => state.camera.selectedCameraId;

const cameraTasks = createSelector(
  tasksByCameraId,
  selectedCameraId,
  (tasks, cameraId) => tasks[cameraId] || null,
);

const screenshotsByTimeTaskSelector = (camera) => (state) => state.camera.selectedCameraId;

export const taskSelectors = { cameraTasks, selectedCameraId, screenshotsByTimeTaskSelector };

export const taskActions = { ...taskSlice.actions, ...taskAsyncActions };

export default taskSlice.reducer;

// const cameraTasks = tasks[selectedCamera._id];
// const screenshotsByTimeTask = cameraTasks.find((task) => task._id === selectedCamera.screenshotsByTimeTask._id);
// const videosByTimeTask = cameraTasks.find((task) => task._id === selectedCamera.videosByTimeTask._id);
// const runningTasks = cameraTasks.filter((task) => task.status === 'Running');
