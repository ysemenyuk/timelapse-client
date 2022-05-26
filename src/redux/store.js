import { configureStore } from '@reduxjs/toolkit';

import cameraReducer from './camera/cameraSlice.js';
import thunkReducer from './thunkSlice.js';
import userReducer from './user/userSlice.js';
import fileManagerReducer from './fileManager/fileManagerSlice.js';
import modalReducer from './modalSlice.js';
import taskReducer from './task/taskSlice.js';

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
