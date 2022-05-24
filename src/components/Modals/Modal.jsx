import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../../redux/slices/modalSlice';
import CreateScreenshotModal from '../CameraInfo/CreateScreenshotModal';
import CreateVideoModal from '../CameraInfo/CreateVideoModal';
import CreateCameraModal from './CreateCameraModal';
import EditCameraModal from './EditCameraModal';
import DeleteCameraModal from './DeleteCameraModal';
import VideosByTimeModal from '../CameraTasks/VideosByTime/VideosByTimeModal';
import ScreenshotsByTimeModal from '../CameraTasks/ScreenshotsByTime/ScreenshotsByTimeModal';
import {
  CREATE_SCREENSHOT, CREATE_VIDEO, CREATE_CAMERA, EDIT_CAMERA, DELETE_CAMERA,
  SCREENSHOTSBYTIME_TASK, VIDEOSBYTIME_TASK,
} from '../../utils/constants';

const modals = {
  [CREATE_SCREENSHOT]: CreateScreenshotModal,
  [CREATE_VIDEO]: CreateVideoModal,
  [CREATE_CAMERA]: CreateCameraModal,
  [EDIT_CAMERA]: EditCameraModal,
  [DELETE_CAMERA]: DeleteCameraModal,
  [VIDEOSBYTIME_TASK]: VideosByTimeModal,
  [SCREENSHOTSBYTIME_TASK]: ScreenshotsByTimeModal,
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
