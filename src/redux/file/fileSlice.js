import { createSlice } from '@reduxjs/toolkit';
import fileAsyncActions from './fileAsyncActions.js';

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    files: {},
    addedFile: {},
  },
  reducers: {
    addFile: (state, action) => {
      console.log('addFile action -', action);
      state.addedFile = action.payload;
    },
  },
});

const addedFile = (state) => state.file.addedFile;

export const fileSelectors = { addedFile };

export const fileActions = { ...fileSlice.actions, ...fileAsyncActions };

export default fileSlice.reducer;
