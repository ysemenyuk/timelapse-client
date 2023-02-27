import { createSlice, createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import cameraAsyncActions from './cameraAsyncActions.js';
import { userActions } from '../user/userSlice.js';

const { fetchAll, fetchOne, fetchCameraStats, createOne, updateOne, deleteOne } = cameraAsyncActions;

const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    cameras: { ids: [], data: {}, stats: {} },
    selectedCameraId: null,
  },
  reducers: {
    selectCamera: (state, action) => {
      state.selectedCameraId = action.payload;
    },
  },
  extraReducers: {
    [userActions.logout]: (state) => {
      state.cameras = { ids: [], data: {}, stats: {} };
      state.selectedCameraId = null;
    },
    [fetchAll.fulfilled]: (state, action) => {
      // including stats
      // console.log('fetchAll.fulfilled action -', action);
      const cameras = { ids: [], data: {}, stats: {} };
      action.payload.forEach((i) => {
        const { _id, stats, ...data } = i;
        cameras.ids.push(_id);
        cameras.stats[_id] = { _id, ...stats };
        cameras.data[_id] = { _id, ...data };
      });
      state.cameras = cameras;
    },
    [fetchOne.fulfilled]: (state, action) => {
      // console.log('fetchOne.fulfilled action -', action);
      const camera = action.payload;
      state.cameras.data[camera._id] = camera;
    },
    [fetchCameraStats.fulfilled]: (state, action) => {
      // console.log('fetchCameraStats.fulfilled action -', action);
      const { _id, stats } = action.payload;
      state.cameras.stats[_id] = stats;
    },
    [createOne.fulfilled]: (state, action) => {
      // console.log('createOne.fulfilled action -', action);
      const camera = action.payload;
      state.cameras.ids.push(camera._id);
      state.cameras.data[camera._id] = camera;
    },
    [updateOne.fulfilled]: (state, action) => {
      // console.log('updateOne.fulfilled action -', action);
      const camera = action.payload;
      state.cameras.data[camera._id] = camera;
    },
    [deleteOne.fulfilled]: (state, action) => {
      // console.log('deleteOne.fulfilled action -', action);
      const camera = action.payload;
      state.cameras.ids = state.cameras.ids.filter((id) => id !== camera._id);
      state.cameras.data = _.omit(state.cameras.data, camera._id);
      state.selectedCameraId = null;
    },
  },
});

const allCameras = (state) => state.camera.cameras.data;
const camerasIds = (state) => state.camera.cameras.ids;
const selectedCameraId = (state) => state.camera.selectedCameraId;
const cameraById = (id) => (state) => state.camera.cameras.data[id];
const cameraStatsByCameraId = (id) => (state) => state.camera.cameras.stats[id] || {};

const selectedCamera = createSelector(
  allCameras,
  selectedCameraId,
  (cameras, id) => cameras[id] || null,
);

export const cameraSelectors = {
  allCameras,
  camerasIds,
  selectedCameraId,
  cameraById,
  cameraStatsByCameraId,
  selectedCamera,
};

export const cameraActions = { ...cameraSlice.actions, ...cameraAsyncActions };

export default cameraSlice.reducer;
