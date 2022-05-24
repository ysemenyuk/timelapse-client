import { createSlice } from '@reduxjs/toolkit';
import taskAsyncActions from '../asyncActions/taskAsyncActions.js';

const { fetchAll, createScreenshot, updateScreenshotsByTime } = taskAsyncActions;

// console.log("cameraSlice");

const taskSlice = createSlice({
  name: 'camera',
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
    },
    [updateScreenshotsByTime.fulfilled]: (state, action) => {
      console.log('updateScreenshotByTime.fulfilled action -', action);
      // const updatedTask = action.payload;
      // const camera = state.cameras[updatedTask.camera];
      // camera.screenshotsByTimeTask = updatedTask;
    },
  },
});

export const taskActions = { ...taskSlice.actions, ...taskAsyncActions };

export default taskSlice.reducer;
