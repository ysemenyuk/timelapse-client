import React from 'react';
// import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Col, ListGroup, Card, Badge, Button } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
import TasksActions from '../TasksActions/TasksActions.jsx';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';

function CameraInfo({ selectedCamera, compact }) {
  const dispatch = useDispatch();

  const openEditCameraModal = () => {
    dispatch(modalActions.openModal({ type: modals.EDIT_CAMERA }));
  };

  const openDeleteCameraModal = async () => {
    dispatch(modalActions.openModal({ type: modals.DELETE_CAMERA }));
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

      <div className="mb-3 d-flex justify-content-between">
        <div>
          <Button onClick={openEditCameraModal} variant="primary" size="sm" className="me-2">
            Settings
          </Button>
          <Button onClick={openDeleteCameraModal} variant="primary" size="sm" className="me-2">
            Delete
          </Button>
        </div>

        <TasksActions />

      </div>

    </Col>
  );
}

export default CameraInfo;
