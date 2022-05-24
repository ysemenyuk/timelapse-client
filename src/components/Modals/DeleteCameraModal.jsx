import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { DELETE_CAMERA } from '../../utils/constants.js';
import withModalWrapper from './withModalWrapper.jsx';
import { cameraActions } from '../../redux/slices/cameraSlice.js';

function DeleteCameraModal({ type, show, onHide, selectedCamera }) {
  const dispatch = useDispatch();
  // const fetchStatus = useThunkStatus(cameraThunks.deleteOne);

  const handleSubmit = () => {
    dispatch(cameraActions.deleteOne(selectedCamera));
  };

  return (
    <Modal
      show={show && type === DELETE_CAMERA}
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

export default withModalWrapper(DeleteCameraModal);
