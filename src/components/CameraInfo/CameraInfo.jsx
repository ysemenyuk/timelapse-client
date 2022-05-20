import React from 'react';
import { useDispatch } from 'react-redux';
import { Col, Button, ListGroup, Spinner } from 'react-bootstrap';
import cameraThunks from '../../thunks/cameraThunks.js';
import Heading from '../UI/Heading.jsx';
import { EDIT_CAMERA } from '../../utils/constants.js';
import { modalActions } from '../../store/modalSlice.js';
import useThunkStatus from '../../hooks/useThunkStatus.js';
import EditCameraModal from '../Modals/EditCameraModal.jsx';

function CameraInfo({ selectedCamera }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(cameraThunks.deleteOne);

  const handleDelete = async () => {
    dispatch(cameraThunks.deleteOne(selectedCamera));
  };

  const openEditCameraModal = () => {
    dispatch(modalActions.openModal(EDIT_CAMERA));
  };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        Camera Info
      </Heading>

      <ListGroup className="mb-3" role="button" onClick={openEditCameraModal}>
        <ListGroup.Item>
          <div className="w-50 me-3">Name:</div>
          <div className="w-75 text-truncate text-muted">{selectedCamera.name}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="w-50 me-3">Description:</div>
          <div className="w-75 text-truncate text-muted">{selectedCamera.description}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="me-3">Screenshot Link:</div>
          <div className="w-75 text-truncate text-muted">{selectedCamera.screenshotLink || 'Empty link'}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="w-50 me-3">Rtsp Link:</div>
          <div className="w-75 text-truncate text-muted">{selectedCamera.rtspLink || 'Empty link'}</div>
        </ListGroup.Item>
      </ListGroup>

      <div className="mb-3">
        <Button onClick={handleDelete} variant="primary" size="sm" className="me-2">
          Delete
          {' '}
          {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}
        </Button>
      </div>

      <EditCameraModal data={selectedCamera} />

    </Col>
  );
}

export default CameraInfo;
