import { createSlice } from '@reduxjs/toolkit';
import fileManagerAsyncActions from './fileManagerAsyncActions.js';

const { fetchFiles, fetchOne, deleteOneFile } = fileManagerAsyncActions;

const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState: {
    files: {},
  },
  reducers: { },
  extraReducers: {
    [fetchFiles.fulfilled]: (state, action) => {
      const { parentId, data } = action.payload;
      state.files[parentId] = data;
    },
    [fetchOne.fulfilled]: (state, action) => {
      const { parentId, data } = action.payload;
      const isExist = state.files[parentId].find((item) => item._id === data._id);
      if (!isExist) {
        state.files[parentId].push(data);
      }
    },
    [deleteOneFile.fulfilled]: (state, action) => {
      const deleted = action.payload;
      state.files[deleted.parent] = state.files[deleted.parent].filter((item) => item._id !== deleted._id);
    },
  },
});

const filesByParent = (state) => state.fileManager.files;

export const fileManagerSelectors = { filesByParent };

export const fileManagerActions = { ...fileManagerSlice.actions, ...fileManagerAsyncActions };

export default fileManagerSlice.reducer;
