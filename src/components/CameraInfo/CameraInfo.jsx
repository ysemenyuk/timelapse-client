import React from 'react';
// import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Col, ListGroup, Card, Badge } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
import CameraActions from '../CameraActions/CameraActions.jsx';
import { EDIT_CAMERA } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';

function CameraInfo({ selectedCamera, compact }) {
  const dispatch = useDispatch();

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
          <Card bsPrefix="card mb-3" role="button" onClick={openEditCameraModal}>
            <Card.Header bsPrefix="card-header d-flex justify-content-between align-items-start fw-bolder">
              {selectedCamera.name}
              <Badge bg="success">Online</Badge>
            </Card.Header>
            <Card.Body bsPrefix="card-body text-truncate pt-2 pb-2">
              {selectedCamera.description}
            </Card.Body>
          </Card>
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
              <div className="me-3">http Link:</div>
              <div className="w-75 text-truncate text-muted">{selectedCamera.photoUrl || 'Empty link'}</div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="w-50 me-3">rtsp Link:</div>
              <div className="w-75 text-truncate text-muted">{selectedCamera.rtspUrl || 'Empty link'}</div>
            </ListGroup.Item>
          </ListGroup>
        </Otherwise>
      </Choose>

      <CameraActions />

    </Col>
  );
}

export default CameraInfo;
