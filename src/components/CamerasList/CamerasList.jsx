import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate, useMatch } from 'react-router-dom';
import { Col, ListGroup, Button } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
import { cameraActions } from '../../redux/camera/cameraSlice.js';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';

function CamerasList({ cameras, selectedCamera }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useMatch('/cameras');

  const handleSelectItem = (cameraId) => () => {
    dispatch(cameraActions.selectCamera(cameraId));
    if (!match) {
      navigate('/cameras');
    }
  };

  const handleAddCamera = () => {
    dispatch(modalActions.openModal({ type: modals.ADD_CAMERA }));
  };

  const renderCamerasList = () => cameras.map((camera) => (
    <ListGroup.Item
      action
      onClick={handleSelectItem(camera._id)}
      key={camera._id}
      className={cn(selectedCamera && selectedCamera._id === camera._id && 'active')}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div className="w-75 text-truncate fw-bold">{camera.name}</div>
        <span
          className={cn('badge', camera.screenshotLink ? 'bg-success' : 'bg-danger')}
        >
          {camera.screenshotLink ? 'Online' : 'Offline'}
        </span>
      </div>
      <div className="w-75 text-truncate small">{camera.description}</div>
    </ListGroup.Item>
  ));

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        Cameras
      </Heading>

      <Choose>
        <When condition={!cameras.length}>
          <div>No cameras.</div>
        </When>
        <Otherwise>
          <ListGroup className="mb-3">
            {renderCamerasList()}
          </ListGroup>
        </Otherwise>
      </Choose>
      <Button onClick={handleAddCamera} size="sm">
        AddCamera
      </Button>
    </Col>
  );
}

export default CamerasList;
