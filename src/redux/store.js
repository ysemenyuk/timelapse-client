import { configureStore } from '@reduxjs/toolkit';

import cameraReducer from './slices/cameraSlice.js';
import thunkReducer from './slices/thunkSlice.js';
import userReducer from './slices/userSlice.js';
import fileManagerReducer from './slices/fileManagerSlice.js';
import modalReducer from './slices/modalSlice.js';
import taskReducer from './slices/taskSlice.js';

export default () => configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    user: userReducer,
    camera: cameraReducer,
    thunk: thunkReducer,
    fileManager: fileManagerReducer,
    modal: modalReducer,
    task: taskReducer,
  },
});
