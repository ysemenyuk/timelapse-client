export const IMAGE_VIEWER = 'IMAGE_VIEWER';
export const HOST = 'http://localhost:4000';

// modals
export const modals = {
  ADD_CAMERA: 'ADD_CAMERA',
  EDIT_CAMERA: 'EDIT_CAMERA',
  DELETE_CAMERA: 'DELETE_CAMERA',

  ADD_CREATE_PHOTO: 'AddCreatePhoto',
  EDIT_CREATE_PHOTO: 'EditCreatePhoto',

  ADD_CREATE_VIDEO: 'AddCreateVideo',
  EDIT_CREATE_VIDEO: 'EditCreateVideo',

  ADD_CREATE_PHOTOS_BY_TIME: 'AddCreatePhotosByTime',
  EDIT_CREATE_PHOTOS_BY_TIME: 'EditCreatePhotosByTime',

  ADD_CREATE_VIDEOS_BY_TIME: 'AddCreateVideosByTime',
  EDIT_CREATE_VIDEOS_BY_TIME: 'EditCreateVideosByTime',
};

// files
export const fileType = {
  FOLDER: 'folder',
};

// tasks
export const taskName = {
  CREATE_PHOTO: 'CreatePhoto',
  CREATE_VIDEO: 'CreateVideo',
  CREATE_PHOTOS_BY_TIME: 'CreatePhotosByTime',
  CREATE_VIDEOS_BY_TIME: 'CreateVideosByTime',
};

export const taskType = {
  ONE_TIME: 'OneTime',
  REPEAT_EVERY: 'RepeatEvery',
  REPEAT_AT: 'RepeatAt',
};

export const taskStatus = {
  CREATED: 'Created',
  READY: 'Ready',
  RUNNING: 'Running',
  STOPPED: 'Stopped',
  SUCCESSED: 'Successed',
  FAILED: 'Failed',
  CANCELED: 'Canceled',
};
