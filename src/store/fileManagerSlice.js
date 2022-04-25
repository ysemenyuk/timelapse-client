import { createSlice } from '@reduxjs/toolkit';
import fileManagerThunks from '../thunks/fileManagerThunks.js';

const { fetchFiles, deleteOneFile } = fileManagerThunks;

const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState: {
    files: {},
    folders: {},
    parent: {},
    stack: {},
    currentFileIndex: null,
  },
  reducers: {
    setCurrentFileIndex: (state, action) => {
      const { index } = action.payload;
      state.currentFileIndex = index;
    },
    nextFile: (state) => {
      state.currentFileIndex += 1;
    },
    prewFile: (state) => {
      state.currentFileIndex -= 1;
    },
    setParentFolder: (state, action) => {
      const { cameraId, folder } = action.payload;
      if (state.stack[cameraId]) {
        const index = state.stack[cameraId].findIndex((item) => item._id === folder._id);
        state.stack[cameraId] = state.stack[cameraId].slice(0, index + 1);
      } else {
        state.stack[cameraId] = [folder];
      }
      state.parent[cameraId] = folder;
    },
    pushToFoldersStack: (state, action) => {
      const { cameraId, item } = action.payload;
      state.stack[cameraId].push(item);
      state.parent[cameraId] = state.stack[cameraId][state.stack[cameraId].length - 1];
    },
    popFromFoldersStack: (state, action) => {
      const { cameraId } = action.payload;
      state.stack[cameraId].pop();
      state.parent[cameraId] = state.stack[cameraId][state.stack[cameraId].length - 1];
    },
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
      const { cameraId, fileId } = action.payload;

      const parentId = state.parent[cameraId]._id;
      state.files[parentId] = state.files[parentId].filter((file) => file._id !== fileId);

      if (state.files[parentId].length === 0) {
        state.currentFileIndex = null;
      } else if (state.currentFileIndex > state.files[parentId].length - 1) {
        state.currentFileIndex = state.files[parentId].length - 1;
      }
    },
  },
});

export const fileManagerActions = { ...fileManagerSlice.actions, ...fileManagerThunks };

export default fileManagerSlice.reducer;
