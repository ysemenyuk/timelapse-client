import { createSlice } from '@reduxjs/toolkit';
import fileManagerAsyncActions from './fileManagerAsyncActions.js';

const { fetchFiles, deleteOneFile } = fileManagerAsyncActions;

const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState: {
    files: {},
    // currentFolderId: null,
    // stack: [],
  },
  reducers: {
    // selectFolderFromStack: (state, action) => {
    //   const folder = action.payload;
    //   const index = state.stack.findIndex((item) => item._id === folder._id);
    //   state.stack = state.stack.slice(0, index + 1);
    // },
    // pushFolderToStack: (state, action) => {
    //   const folder = action.payload;
    //   state.stack.push(folder);
    // },
    // popFolderFromStack: (state) => {
    //   state.stack.pop();
    // },
  },
  extraReducers: {
    [fetchFiles.fulfilled]: (state, action) => {
      const { parentId, data } = action.payload;
      state.files[parentId] = data;
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
