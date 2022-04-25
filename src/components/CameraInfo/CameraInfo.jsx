import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Col, Button, ListGroup, Spinner } from 'react-bootstrap';
import cameraThunks from '../../thunks/cameraThunks.js';
import Heading from '../UI/Heading.jsx';
import { EDIT_CAMERA } from '../../utils/constants.js';
import { modalActions } from '../../store/modalSlice.js';
import useThunkStatus from '../../hooks/useThunkStatus.js';
import EditCameraModal from '../Modals/EditCameraModal.jsx';

function CameraInfo({ selectedCamera }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const fetchStatus = useThunkStatus(cameraThunks.deleteOne);

  const handleDelete = async () => {
    dispatch(cameraThunks.deleteOne(selectedCamera));
  };

  const openEditCameraModal = () => {
    dispatch(modalActions.openModal(EDIT_CAMERA));
  };

  const handleCameraPage = () => {
    history.push(`/cameras/${selectedCamera._id}`);
  };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        CameraInfo
      </Heading>
      <ListGroup className="mb-3">
        <ListGroup.Item>
          <div className="w-50 me-3">Name:</div>
          <div className="w-75 text-truncate text-muted">{selectedCamera.name}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="w-50 me-3">Description:</div>
          <div className="w-75 text-truncate text-muted">{selectedCamera.description}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="d-flex justify-content-between align-items-start">
            <div className="me-3">Screenshot Link:</div>
            <span
              className={cn('badge', selectedCamera.screenshotLink ? 'bg-success' : 'bg-danger')}
            >
              {selectedCamera.screenshotLink ? 'Online' : 'Offline'}
            </span>
          </div>
          <div className="w-75 text-truncate text-muted">
            {selectedCamera.screenshotLink || 'Empty link'}
          </div>
        </ListGroup.Item>
      </ListGroup>

      <div className="mb-3">
        <Button onClick={openEditCameraModal} variant="primary" size="sm" className="me-2">
          EditSettings
        </Button>
        <Button onClick={handleDelete} variant="primary" size="sm" className="me-2">
          Delete
          {' '}
          {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}
        </Button>
        <Button onClick={handleCameraPage} variant="info" size="sm" className="me-2">
          GoToFiles
        </Button>
      </div>

      <EditCameraModal data={selectedCamera} />

    </Col>
  );
}

export default CameraInfo;
