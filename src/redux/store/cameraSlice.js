import { createSlice, createSelector } from '@reduxjs/toolkit';
import cameraThunks from '../asyncActions/cameraAsyncActions.js';
import taskThunks from '../asyncActions/taskAsyncActions.js';
import { userActions } from './userSlice.js';

const { fetchAll, fetchOne, createOne, updateOne, deleteOne } = cameraThunks;
const { updateScreenshotsByTime } = taskThunks;

// console.log("cameraSlice");

const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    cameras: {},
    selectedCameraId: null,
  },
  reducers: {
    selectCamera: (state, action) => {
      state.selectedCameraId = action.payload;
    },
  },
  extraReducers: {
    [userActions.logout]: (state) => {
      state.cameras = [];
      state.selectedCameraId = null;
    },
    [fetchAll.fulfilled]: (state, action) => {
      // console.log('fetchAll.fulfilled action -', action);
      const cameras = action.payload;
      if (cameras.length > 0) {
        cameras.forEach((camera) => {
          state.cameras[`${camera._id}`] = camera;
        });
        if (state.selectedCameraId === null) {
          state.selectedCameraId = cameras[0]._id;
        }
      }
    },
    [fetchOne.fulfilled]: (state, action) => {
      // console.log('fetchOne.fulfilled action -', action);
      const camera = action.payload;
      state.cameras[`${camera._id}`] = camera;
      state.selectedCameraId = camera._id;
    },
    [createOne.fulfilled]: (state, action) => {
      // console.log('createOne.fulfilled action -', action);
      const createdCamera = action.payload;
      state.cameras[`${createdCamera._id}`] = createdCamera;
      state.selectedCameraId = createdCamera._id;
    },
    [updateOne.fulfilled]: (state, action) => {
      // console.log('updateOne.fulfilled action -', action);
      const updatedCamera = action.payload;
      state.cameras[`${updatedCamera._id}`] = updatedCamera;
      state.selectedCameraId = updatedCamera._id;
    },
    [deleteOne.fulfilled]: (state, action) => {
      // console.log('deleteOne.fulfilled action -', action);
      const deletedItem = action.payload;

      const cameras = { ...state.cameras };
      delete cameras[`${deletedItem._id}`];

      const selectedCameraId = Object.keys(cameras)[0] || null;

      return { cameras, selectedCameraId };
    },
    [updateScreenshotsByTime.fulfilled]: (state, action) => {
      // console.log('updateScreenshotByTime.fulfilled action -', action);
      const updatedTask = action.payload;
      const camera = state.cameras[updatedTask.camera];
      camera.screenshotsByTimeTask = updatedTask;
    },
  },
});

const allCameras = (state) => Object.values(state.camera.cameras);
const camerasObject = (state) => state.camera.cameras;
const selectedCameraId = (state) => state.camera.selectedCameraId;

const selectedCamera = createSelector(
  camerasObject,
  selectedCameraId,
  (cameras, id) => cameras[id] || null,
);

export const cameraSelectors = { allCameras, selectedCamera };

export const cameraActions = { ...cameraSlice.actions, ...cameraThunks };

export default cameraSlice.reducer;
