import { createSlice, createSelector } from '@reduxjs/toolkit';
import { cameraSelectors } from '../camera/cameraSlice.js';
import taskAsyncActions from './taskAsyncActions.js';

const { fetchAll, createScreenshot, createVideoFile, updateScreenshotsByTime, updateVideosByTime } = taskAsyncActions;

// console.log("cameraSlice");

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    selectedTaskId: null,
  },
  reducers: {
    updateTask: (state, action) => {
      console.log('updateTask action -', action);

      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
      state.tasks[index] = updatedTask;
    },
  },
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      // console.log('fetchAll.fulfilled action -', action);

      const { data } = action.payload;
      state.tasks.push(...data);
    },
    [createScreenshot.fulfilled]: (state, action) => {
      // console.log('createScreenshot.fulfilled action -', action);

      const { data } = action.payload;
      state.tasks.push(data);
    },
    [createVideoFile.fulfilled]: (state, action) => {
      // console.log('createScreenshot.fulfilled action -', action);

      const { data } = action.payload;
      state.tasks.push(data);
    },
    [updateScreenshotsByTime.fulfilled]: (state, action) => {
      // console.log('updateScreenshotByTime.fulfilled action -', action);

      const { taskId, data } = action.payload;
      const index = state.tasks.findIndex((task) => task._id === taskId);
      state.tasks[index] = data;
    },
    [updateVideosByTime.fulfilled]: (state, action) => {
      // console.log('updateVideosByTime.fulfilled action -', action);

      const { taskId, data } = action.payload;
      const index = state.tasks.findIndex((task) => task._id === taskId);
      state.tasks[index] = data;
    },
  },
});

const allTasks = (state) => state.task.tasks;

const cameraTasks = createSelector(
  allTasks,
  cameraSelectors.selectedCameraId,
  (tasks, cameraId) => tasks.filter((item) => item.camera === cameraId) || null,
);

const screenshotsByTimeTask = createSelector(
  allTasks,
  cameraSelectors.selectedCamera,
  (tasks, camera) => tasks.find((task) => task._id === camera.screenshotsByTimeTask) || null,
);

const videosByTimeTask = createSelector(
  allTasks,
  cameraSelectors.selectedCamera,
  (tasks, camera) => tasks.find((task) => task._id === camera.videosByTimeTask) || null,
);

export const taskSelectors = { cameraTasks, screenshotsByTimeTask, videosByTimeTask };

export const taskActions = { ...taskSlice.actions, ...taskAsyncActions };

export default taskSlice.reducer;
