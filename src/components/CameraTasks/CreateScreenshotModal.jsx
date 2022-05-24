import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Modal } from 'react-bootstrap';
import { CREATE_SCREENSHOT } from '../../utils/constants.js';
// import withModalWrapper from '../Modals/withModalWrapper.jsx';
import { taskActions } from '../../redux/slices/taskSlice.js';
import { cameraSelectors } from '../../redux/slices/cameraSlice.js';
// import useThunkStatus from '../../hooks/useThunkStatus.js';

function CreateScreenshotModal({ show, onHide }) {
  const dispatch = useDispatch();
  // const fetchStatus = useThunkStatus(taskActions.createScreenshot);
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  const handleSubmit = () => {
    dispatch(taskActions.createScreenshot({ cameraId: selectedCamera._id }))
      .then((resp) => {
        unwrapResult(resp);
        onHide();
      })
      .catch((e) => {
        console.log('catch err -', e);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create screenshot</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>Create screenshot from camera by http request</div>
        <div className="text-truncate">{`"${selectedCamera.screenshotLink}"`}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          key="close"
          onClick={onHide}
          size="sm"
        >
          Cancel
        </Button>
        <Button
          key="submit"
          onClick={handleSubmit}
          size="sm"
        >
          Submit
        </Button>
      </Modal.Footer>

    </Modal>
  );
}

export default CreateScreenshotModal;
