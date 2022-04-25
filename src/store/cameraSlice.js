import { createSlice } from '@reduxjs/toolkit';

import cameraThunks from '../thunks/cameraThunks.js';
import { userActions } from './userSlice.js';

const { fetchAll, fetchOne, createOne, updateOne, deleteOne } = cameraThunks;

// console.log("cameraSlice");

const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    allCameras: [],
    selectedCamera: null,
  },
  reducers: {
    selectCamera: (state, action) => {
      state.selectedCamera = action.payload;
    },
  },
  extraReducers: {
    [userActions.logout]: (state) => {
      state.allCameras = [];
      state.selectedCamera = null;
    },
    [fetchAll.fulfilled]: (state, action) => {
      state.allCameras = action.payload;
      if (state.selectedCamera === null && action.payload.length !== 0) {
        // eslint-disable-next-line prefer-destructuring
        state.selectedCamera = action.payload[0];
      }
    },
    [fetchOne.fulfilled]: (state, action) => {
      state.selectedCamera = action.payload;
    },
    [createOne.fulfilled]: (state, action) => {
      // console.log('action createOne -', action);
      state.allCameras.push(action.payload);
      state.selectedCamera = action.payload;
    },
    [updateOne.fulfilled]: (state, action) => {
      // console.log('action updateOne -', action);
      const updatedItem = action.payload;
      const updatedItemIndex = state.allCameras.findIndex((item) => item._id === updatedItem._id);
      state.allCameras[updatedItemIndex] = updatedItem;
      state.selectedCamera = updatedItem;
    },
    [deleteOne.fulfilled]: (state, action) => {
      // console.log('action deleteOne -', action);
      const deletedItem = action.payload;
      state.allCameras = state.allCameras.filter((item) => item._id !== deletedItem._id);
      if (state.allCameras.length === 0) {
        state.selectedCamera = null;
      } else {
        // eslint-disable-next-line prefer-destructuring
        state.selectedCamera = state.allCameras[0];
      }
    },
  },
});

export const cameraActions = { ...cameraSlice.actions, ...cameraThunks };

export default cameraSlice.reducer;
