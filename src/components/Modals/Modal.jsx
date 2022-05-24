import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../../redux/slices/modalSlice';
import { CREATE_SCREENSHOT } from '../../utils/constants';
import CreateScreenshotModal from '../CameraTasks/CreateScreenshotModal';

const modals = {
  [CREATE_SCREENSHOT]: CreateScreenshotModal,
};

function Modal() {
  const dispatch = useDispatch();
  const { show, type } = useSelector((state) => state.modal);

  if (!show) {
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
