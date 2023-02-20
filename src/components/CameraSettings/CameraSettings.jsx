import React from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { cameraSelectors } from '../../redux/camera/cameraSlice';
// import { useOutletContext } from 'react-router-dom';

function CameraSettings() {
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  return (
    <Col md={12} className="mb-4">
      <div>{`Name: ${selectedCamera.name}`}</div>
      <div>{`Id: ${selectedCamera._id}`}</div>
    </Col>
  );
}

export default CameraSettings;
