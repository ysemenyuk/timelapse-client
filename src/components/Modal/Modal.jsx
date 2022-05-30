import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../../redux/modalSlice';
import CreatePhotoModal from '../CameraActions/CreatePhotoModal';
import CreateVideoModal from '../CameraActions/CreateVideoModal';
import CreateCameraModal from '../CameraActions/CreateCameraModal';
import EditCameraModal from '../CameraActions/EditCameraModal';
import DeleteCameraModal from '../CameraActions/DeleteCameraModal';
import VideosByTimeModal from '../CameraTasks/VideosByTime/VideosByTimeModal';
import PhotosByTimeModal from '../CameraTasks/PhotosByTime/PhotosByTimeModal';
import { ADD_CAMERA, EDIT_CAMERA, DELETE_CAMERA, taskName } from '../../utils/constants';

const { CREATE_PHOTO, CREATE_VIDEO, CREATE_PHOTOS_BY_TIME, CREATE_VIDEOS_BY_TIME } = taskName;

const modals = {
  [ADD_CAMERA]: CreateCameraModal,
  [EDIT_CAMERA]: EditCameraModal,
  [DELETE_CAMERA]: DeleteCameraModal,
  [CREATE_PHOTO]: CreatePhotoModal,
  [CREATE_VIDEO]: CreateVideoModal,
  [CREATE_PHOTOS_BY_TIME]: PhotosByTimeModal,
  [CREATE_VIDEOS_BY_TIME]: VideosByTimeModal,
};

function Modal() {
  const dispatch = useDispatch();
  const { show, type } = useSelector((state) => state.modal);

  if (!show || !Object.keys(modals).includes(type)) {
    return null;
  }

  const CurrentModal = modals[type];

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <CurrentModal show={show} onHide={handleClose} />
  );
}

export default Modal;
