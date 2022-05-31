import { createSlice, createSelector } from '@reduxjs/toolkit';
import { cameraSelectors } from '../camera/cameraSlice.js';
import taskAsyncActions from './taskAsyncActions.js';

const { fetchAll, createOne, updateOne, deleteOne } = taskAsyncActions;

// console.log("cameraSlice");

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: {},
    selectedTaskId: null,
  },
  reducers: {
    selectTask: (state, action) => {
      // console.log('updateTask action -', action);
      state.selectedTaskId = action.payload;
    },
    updateTask: (state, action) => {
      // console.log('updateTask action -', action);
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
      state.tasks[index] = updatedTask;
    },
  },
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      // console.log('fetchAll.fulfilled action -', action);
      const { cameraId, data } = action.payload;
      state.tasks[cameraId] = data;
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
const selectedTaskId = (state) => state.task.selectedTaskId;

const selectedTask = createSelector(
  allTasks,
  cameraSelectors.selectedCameraId,
  selectedTaskId,
  (tasks, cameraId, taskId) => tasks[cameraId].find((item) => item._id === taskId) || null,
);

const cameraTasks = createSelector(
  allTasks,
  cameraSelectors.selectedCameraId,
  (tasks, cameraId) => tasks[cameraId] || null,
);

export const taskSelectors = { cameraTasks, selectedTask };

export const taskActions = { ...taskSlice.actions, ...taskAsyncActions };

export default taskSlice.reducer;
