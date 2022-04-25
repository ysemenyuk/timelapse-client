import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './cameraSlice.js';
import thunkReducer from './thunkSlice.js';
import userReducer from './userSlice.js';
import fileManagerReducer from './fileManagerSlice.js';
import modalSlice from './modalSlice.js';

// console.log('store');

export default () => configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    user: userReducer,
    camera: cameraReducer,
    thunk: thunkReducer,
    fileManager: fileManagerReducer,
    modal: modalSlice,
  },
});
