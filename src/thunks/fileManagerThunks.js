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

// const fetchMainFolder = createAsyncThunk(
//   'folder/fetchMainFolder',
//   async ({ cameraId, folderId }) => {
//     try {
//       console.log('folder/fetchMainFolder cameraId folderId -', { cameraId, folderId });

//       const response = await fileManagerService.getOneFolder(cameraId, folderId);

//       console.log('folder/fetchMainFolder response.data -', response.data);

//       return { cameraId, data: response.data };
//     } catch (e) {
//       console.log('folder/fetchMainFolder error -', e.message);
//       throw e;
//     }
//   },
// );

const deleteOneFile = createAsyncThunk('file/deleteOneFile', async ({ cameraId, fileId }, { rejectWithValue }) => {
  try {
    console.log('file/deleteOneFile cameraId fileId -', { cameraId, fileId });

    const response = await fileManagerService.deleteOneById(cameraId, fileId);

    console.log(44444, 'file/deleteOneFile response.data -', response.data);

    return { cameraId, fileId };
  } catch (error) {
    console.log(555555, 'file/deleteOneFile error -', error);
    if (!error.response) {
      throw error;
    }
    console.log(66666, 'file/deleteOneFile error.response.data -', error.response.data);
    return rejectWithValue(error.response.data);
  }
});

export default { fetchFiles, deleteOneFile };
