import { createSlice, createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import cameraAsyncActions from './cameraAsyncActions.js';
import { userActions } from '../user/userSlice.js';

const { fetchAll, fetchOne, createOne, updateOne, deleteOne } = cameraAsyncActions;

const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    cameras: { ids: [], data: {} },
    selectedCameraId: null,
  },
  reducers: {
    selectCamera: (state, action) => {
      state.selectedCameraId = action.payload;
    },
  },
  extraReducers: {
    [userActions.logout]: (state) => {
      state.cameras = { ids: [], data: {} };
      state.selectedCameraId = null;
    },
    [fetchAll.fulfilled]: (state, action) => {
      // console.log('fetchAll.fulfilled action -', action);
      const cameras = { ids: [], data: {} };
      action.payload.forEach((i) => {
        cameras.ids.push(i._id);
        cameras.data[i._id] = i;
      });
      state.cameras = cameras;
    },
    [fetchOne.fulfilled]: (state, action) => {
      // console.log('fetchOne.fulfilled action -', action);
      const camera = action.payload;
      if (_.includes(state.cameras.ids, camera._id)) {
        state.cameras.data[camera._id] = camera;
      } else {
        state.cameras.ids.push(camera._id);
        state.cameras.data[camera._id] = camera;
      }
    },
    [createOne.fulfilled]: (state, action) => {
      // console.log('createOne.fulfilled action -', action);
      const createdCamera = action.payload;
      state.cameras.ids.push(createdCamera._id);
      state.cameras.data[createdCamera._id] = createdCamera;
    },
    [updateOne.fulfilled]: (state, action) => {
      // console.log('updateOne.fulfilled action -', action);
      const updatedCamera = action.payload;
      state.cameras.data[updatedCamera._id] = updatedCamera;
    },
    [deleteOne.fulfilled]: (state, action) => {
      // console.log('deleteOne.fulfilled action -', action);
      const deletedItem = action.payload;
      state.cameras.ids = state.cameras.ids.filter((id) => id !== deletedItem._id);
      state.cameras.data = _.omit(state.cameras.data, deletedItem._id);
      state.selectedCameraId = null;
    },
  },
});

const allCameras = (state) => state.camera.cameras.data;
const camerasIds = (state) => state.camera.cameras.ids;
const selectedCameraId = (state) => state.camera.selectedCameraId;
const cameraById = (id) => (state) => state.camera.cameras.data[id];

const selectedCamera = createSelector(
  allCameras,
  selectedCameraId,
  (cameras, id) => cameras[id] || null,
);

export const cameraSelectors = { allCameras, camerasIds, selectedCameraId, cameraById, selectedCamera };

export const cameraActions = { ...cameraSlice.actions, ...cameraAsyncActions };

export default cameraSlice.reducer;
