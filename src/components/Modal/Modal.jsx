import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { modalActions } from '../../redux/modalSlice';
import { modals } from '../../utils/constants';
import AddCameraModal from '../CameraInfo/CameraModal/AddCameraModal';
import EditCameraModal from '../CameraInfo/CameraModal/EditCameraModal';
import DeleteCameraModal from '../CameraInfo/CameraModal/DeleteCameraModal';
import AddCreatePhotoModal from '../TasksActions/CreatePhotoModal/AddModal';
import EditCreatePhotoModal from '../TasksActions/CreatePhotoModal/EditModal';
import AddCreateVideoModal from '../TasksActions/CreateVideoModal/AddModal';
import EditCreateVideoModal from '../TasksActions/CreateVideoModal/EditModal';
import AddCreatePhotosByTimeModal from '../TasksActions/CreatePhotosByTimeModal/AddModal';
import EditCreatePhotosByTimeModal from '../TasksActions/CreatePhotosByTimeModal/EditModal';
import AddCreateVideosByTimeModal from '../TasksActions/CreateVideosByTimeModal/AddModal';
import EditCreateVideosByTimeModal from '../TasksActions/CreateVideosByTimeModal/EditModal';

const modalsMap = {
  [modals.ADD_CAMERA]: AddCameraModal,
  [modals.EDIT_CAMERA]: EditCameraModal,
  [modals.DELETE_CAMERA]: DeleteCameraModal,
  [modals.ADD_CREATE_PHOTO_BY_HAND]: AddCreatePhotoModal,
  [modals.EDIT_CREATE_PHOTO_BY_HAND]: EditCreatePhotoModal,
  [modals.ADD_CREATE_VIDEO_BY_HAND]: AddCreateVideoModal,
  [modals.EDIT_CREATE_VIDEO_BY_HAND]: EditCreateVideoModal,
  [modals.ADD_CREATE_PHOTOS_BY_TIME]: AddCreatePhotosByTimeModal,
  [modals.EDIT_CREATE_PHOTOS_BY_TIME]: EditCreatePhotosByTimeModal,
  [modals.ADD_CREATE_VIDEOS_BY_TIME]: AddCreateVideosByTimeModal,
  [modals.EDIT_CREATE_VIDEOS_BY_TIME]: EditCreateVideosByTimeModal,
};

function ModalWrapper() {
  const dispatch = useDispatch();
  const { show, type, data } = useSelector((state) => state.modal);

  if (!show || !Object.keys(modalsMap).includes(type)) {
    return null;
  }

  const CurrentModalBody = modalsMap[type];

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <CurrentModalBody onHide={handleClose} data={data} />
    </Modal>
  );
}

export default ModalWrapper;
