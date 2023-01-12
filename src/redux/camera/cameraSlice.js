import { createSlice, createSelector } from '@reduxjs/toolkit';
import cameraAsyncActions from './cameraAsyncActions.js';
import { userActions } from '../user/userSlice.js';

const { fetchAll, fetchOne, createOne, updateOne, deleteOne } = cameraAsyncActions;

const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    cameras: [],
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
      state.cameras = cameras;
      if (cameras.length > 0) {
        state.selectedCameraId = cameras[0]._id;
      }
    },
    [fetchOne.fulfilled]: (state, action) => {
      // console.log('fetchOne.fulfilled action -', action);
      const camera = action.payload;
      const cameraIndex = state.cameras.findIndex((item) => item._id === camera._id);

      if (cameraIndex >= 0) {
        state.cameras[cameraIndex] = camera;
      } else {
        state.cameras.push(camera);
        state.selectedCameraId = camera._id;
      }
    },
    [createOne.fulfilled]: (state, action) => {
      // console.log('createOne.fulfilled action -', action);
      const createdCamera = action.payload;
      state.cameras.push(createdCamera);
      state.selectedCameraId = createdCamera._id;
    },
    [updateOne.fulfilled]: (state, action) => {
      // console.log('updateOne.fulfilled action -', action);
      const updatedCamera = action.payload;
      const updatedCameraIndex = state.cameras.findIndex((item) => item._id === updatedCamera._id);
      state.cameras[updatedCameraIndex] = updatedCamera;
      state.selectedCameraId = updatedCamera._id;
    },
    [deleteOne.fulfilled]: (state, action) => {
      // console.log('deleteOne.fulfilled action -', action);
      const deletedItem = action.payload;
      state.cameras = state.cameras.filter((item) => item._id !== deletedItem._id);
      state.selectedCameraId = state.cameras[0] || null;
    },
  },
});

const allCameras = (state) => state.camera.cameras;
const selectedCameraId = (state) => state.camera.selectedCameraId;

const selectedCamera = createSelector(
  allCameras,
  selectedCameraId,
  (cameras, id) => cameras.find((item) => item._id === id) || null,
);

export const cameraSelectors = { allCameras, selectedCameraId, selectedCamera };

export const cameraActions = { ...cameraSlice.actions, ...cameraAsyncActions };

export default cameraSlice.reducer;
