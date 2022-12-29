import React from 'react';
// import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Col, ListGroup, Card, Button } from 'react-bootstrap';
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

      <Choose>
        <When condition={compact}>
          <Card bsPrefix="card mb-3" role="button" onClick={openEditCameraModal}>
            <Card.Img variant="top" src={`/files/${selectedCamera.avatar._id}`} />
            <Card.Header bsPrefix="card-header text-truncate pt-2 pb-2">
              <div className="w-75 text-truncate fw-bold">{selectedCamera.name}</div>
              <div className="w-75 text-truncate">{selectedCamera.description}</div>
            </Card.Header>
            <Card.Body bsPrefix="card-body text-truncate pt-2 pb-2">
              <div className="w-75 text-truncate">First photo: 01.01.2022</div>
              <div className="w-75 text-truncate">Last photo: 01.12.2022</div>
              <div className="w-75 text-truncate">Total photos: 15000</div>
              <div className="w-75 text-truncate">Total videos: 50</div>
            </Card.Body>

          </Card>
        </When>

        <Otherwise>
          <Heading lvl={6} className="mb-3">
            Info
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
