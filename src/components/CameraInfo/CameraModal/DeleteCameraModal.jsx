import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { cameraActions, cameraSelectors } from '../../../redux/camera/cameraSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus.js';

function DeleteCameraModal({ onHide }) {
  const dispatch = useDispatch();
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);
  const fetchStatus = useThunkStatus(cameraActions.deleteOne);
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(cameraActions.deleteOne(selectedCamera))
      .then(() => {
        onHide();
        navigate('/cameras');
      })
      .catch((e) => {
        console.log('- catch formik err -', e);
      });
  };

  if (!selectedCamera) {
    return null;
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Delete camera</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {`Delete "${selectedCamera.name}" camera and all files?`}
      </Modal.Body>

      <Modal.Footer>
        {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}

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
    </>
  );
}

export default DeleteCameraModal;
