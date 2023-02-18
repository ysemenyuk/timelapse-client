import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './camera/cameraSlice.js';
import thunkReducer from './thunkSlice.js';
import userReducer from './user/userSlice.js';
import fileReducer from './file/fileSlice.js';
import modalReducer from './modalSlice.js';
import taskReducer from './task/taskSlice.js';
import { fileManagerApi } from '../api/fileManager.api.js';
import { dateInfoApi } from '../api/dateInfo.api.js';

export default () => configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(fileManagerApi.middleware, dateInfoApi.middleware),
  reducer: {
    user: userReducer,
    camera: cameraReducer,
    thunk: thunkReducer,
    file: fileReducer,
    modal: modalReducer,
    task: taskReducer,
    [fileManagerApi.reducerPath]: fileManagerApi.reducer,
    [dateInfoApi.reducerPath]: dateInfoApi.reducer,
  },
});
