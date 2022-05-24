import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Col, Button, ListGroup } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
import { EDIT_CAMERA, DELETE_CAMERA } from '../../utils/constants.js';
import { modalActions } from '../../redux/slices/modalSlice.js';
import EditCameraModal from '../Modals/EditCameraModal.jsx';
import DeleteCameraModal from '../Modals/DeleteCameraModal.jsx';

function CameraInfo({ selectedCamera, compact }) {
  const dispatch = useDispatch();

  const openDeleteCameraModal = async () => {
    dispatch(modalActions.openModal(DELETE_CAMERA));
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
        Info
      </Heading>

      <Choose>
        <When condition={compact}>
          <ListGroup className="mb-3" role="button" onClick={openEditCameraModal}>
            <ListGroup.Item>
              <div className="d-flex justify-content-between align-items-start">
                <div className="w-75 text-truncate fw-bold">{selectedCamera.name}</div>
                <span
                  className={cn('badge', selectedCamera.screenshotLink ? 'bg-success' : 'bg-danger')}
                >
                  {selectedCamera.screenshotLink ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="w-75 text-truncate text-muted">{selectedCamera.description}</div>
            </ListGroup.Item>
          </ListGroup>
        </When>

        <Otherwise>
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
        </Otherwise>
      </Choose>

      <div className="mb-3">
        <Button onClick={openEditCameraModal} variant="primary" size="sm" className="me-2">
          Edit
        </Button>
        <Button onClick={openDeleteCameraModal} variant="primary" size="sm" className="me-2">
          Delete
        </Button>
      </div>

      <EditCameraModal selectedCamera={selectedCamera} />
      <DeleteCameraModal selectedCamera={selectedCamera} />
    </Col>
  );
}

export default CameraInfo;
