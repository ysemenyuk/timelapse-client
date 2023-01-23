import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { modalActions } from '../../redux/modalSlice';
import { modals } from '../../utils/constants';
import AddCameraModal from '../CameraModal/AddCameraModal';
import EditCameraModal from '../CameraModal/EditCameraModal';
import DeleteCameraModal from '../CameraModal/DeleteCameraModal';
import AddCreatePhotoModal from '../TasksActions/CreatePhoto/AddModal';
import EditCreatePhotoModal from '../TasksActions/CreatePhoto/InfoModal';
import AddCreateVideoModal from '../TasksActions/CreateVideo/AddModal';
import EditCreateVideoModal from '../TasksActions/CreateVideo/InfoModal';
import AddCreatePhotosByTimeModal from '../TasksActions/CreatePhotosByTime/AddModal';
import EditCreatePhotosByTimeModal from '../TasksActions/CreatePhotosByTime/EditModal';
import AddCreateVideosByTimeModal from '../TasksActions/CreateVideosByTime/AddModal';
import EditCreateVideosByTimeModal from '../TasksActions/CreateVideosByTime/EditModal';

const modalsMap = {
  [modals.ADD_CAMERA]: AddCameraModal,
  [modals.EDIT_CAMERA]: EditCameraModal,
  [modals.DELETE_CAMERA]: DeleteCameraModal,
  [modals.ADD_CREATE_PHOTO]: AddCreatePhotoModal,
  [modals.EDIT_CREATE_PHOTO]: EditCreatePhotoModal,
  [modals.ADD_CREATE_VIDEO]: AddCreateVideoModal,
  [modals.EDIT_CREATE_VIDEO]: EditCreateVideoModal,
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
