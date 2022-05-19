import { createSlice } from '@reduxjs/toolkit';
import fileManagerThunks from '../thunks/fileManagerThunks.js';

const { fetchFiles, deleteOneFile } = fileManagerThunks;

const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState: {
    files: {},
    folders: {},
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

      const files = [];
      const folders = [];

      data.forEach((item) => {
        if (item.type === 'folder') {
          folders.push(item);
        } else {
          files.push(item);
        }
      });

      state.files[parentId] = files;
      state.folders[parentId] = folders;
    },
    [deleteOneFile.fulfilled]: (state, action) => {
      const deleted = action.payload;
      state.files[deleted.parent] = state.files[deleted.parent].filter((item) => item._id !== deleted._id);
    },
  },
});

export const fileManagerActions = { ...fileManagerSlice.actions, ...fileManagerThunks };

export default fileManagerSlice.reducer;
