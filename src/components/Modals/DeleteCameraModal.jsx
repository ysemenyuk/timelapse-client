import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { cameraActions, cameraSelectors } from '../../redux/slices/cameraSlice.js';

function DeleteCameraModal({ show, onHide }) {
  const dispatch = useDispatch();
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);
  // const fetchStatus = useThunkStatus(cameraThunks.deleteOne);

  const handleSubmit = () => {
    dispatch(cameraActions.deleteOne(selectedCamera));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete camera</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {`Delete "${selectedCamera.name}" camera and all files?`}
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

export default DeleteCameraModal;
