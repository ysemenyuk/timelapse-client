import { createAsyncThunk } from '@reduxjs/toolkit';
import fileManagerService from '../api/fileManager.service.js';

const fetchFiles = createAsyncThunk('file/fetchFiles', async ({ cameraId, parentId }) => {
  try {
    console.log('file/fetchFiles cameraId, parentId -', { cameraId, parentId });

    const response = await fileManagerService.getAll(cameraId, { parentId });

    console.log('file/fetchFiles response.data -', response.data);

    return { cameraId, parentId, data: response.data };
  } catch (e) {
    console.log('file/fetchFiles error -', e.message);
    throw e;
  }
});

const deleteOneFile = createAsyncThunk('file/deleteOneFile', async ({ cameraId, file }, { rejectWithValue }) => {
  try {
    console.log('file/deleteOneFile cameraId file -', file);

    const response = await fileManagerService.deleteOneById(cameraId, file._id);

    console.log('file/deleteOneFile response.data -', response.data);

    return file;
  } catch (error) {
    console.log('file/deleteOneFile error -', error);
    if (!error.response) {
      throw error;
    }
    console.log('file/deleteOneFile error.response.data -', error.response.data);
    return rejectWithValue(error.response.data);
  }
});

export default { fetchFiles, deleteOneFile };
