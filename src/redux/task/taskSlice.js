import { createSlice, createSelector } from '@reduxjs/toolkit';
import { cameraSelectors } from '../camera/cameraSlice.js';
import taskAsyncActions from './taskAsyncActions.js';

const { fetchAll, fetchOne, createOne, updateOne, deleteOne } = taskAsyncActions;

// console.log("cameraSlice");

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: {},
  },
  reducers: {
    selectTask: (state, action) => {
      // console.log('updateTask action -', action);
      state.selectedTaskId = action.payload;
    },
    updateTask: (state, action) => {
      // console.log('updateTask action -', action);
      const updatedTask = action.payload;
      const cameraId = updatedTask.camera;
      const index = state.tasks[cameraId].findIndex((task) => task._id === updatedTask._id);
      state.tasks[cameraId][index] = updatedTask;
    },
  },
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      // console.log('fetchAll.fulfilled action -', action);
      const { cameraId, data } = action.payload;
      state.tasks[cameraId] = data;
    },
    [fetchOne.fulfilled]: (state, action) => {
      // console.log('updateOne.fulfilled action -', action);
      const { cameraId, taskId, data } = action.payload;
      const index = state.tasks[cameraId].findIndex((task) => task._id === taskId);
      if (index) {
        state.tasks[cameraId][index] = data;
      }
    },
    [createOne.fulfilled]: (state, action) => {
      // console.log('createOne.fulfilled action -', action);
      const { cameraId, data } = action.payload;
      state.tasks[cameraId].push(data);
    },
    [updateOne.fulfilled]: (state, action) => {
      // console.log('updateOne.fulfilled action -', action);
      const { cameraId, taskId, data } = action.payload;
      const index = state.tasks[cameraId].findIndex((task) => task._id === taskId);
      state.tasks[cameraId][index] = data;
    },
    [deleteOne.fulfilled]: (state, action) => {
      // console.log('updateOne.fulfilled action -', action);
      const { cameraId, taskId } = action.payload;
      state.tasks[cameraId] = state.tasks[cameraId].filter((task) => task._id !== taskId);
    },
  },
});

const allTasks = (state) => state.task.tasks;

const selectTaskById = (id) => createSelector(
  allTasks,
  cameraSelectors.selectedCameraId,
  (tasks, cameraId) => tasks[cameraId].find((i) => i._id === id) || null,
);

const cameraTasks = createSelector(
  allTasks,
  cameraSelectors.selectedCameraId,
  (tasks, cameraId) => tasks[cameraId] || null,
);

export const taskSelectors = { cameraTasks, selectTaskById };

export const taskActions = { ...taskSlice.actions, ...taskAsyncActions };

export default taskSlice.reducer;
