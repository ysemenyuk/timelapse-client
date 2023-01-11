import React from 'react';
import { Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';

function CameraSettings() {
  const { selectedCamera } = useOutletContext();

  return (
    <Col md={12} className="mb-4">
      <div>{`Name: ${selectedCamera.name}`}</div>
      <div>{`Id: ${selectedCamera._id}`}</div>
    </Col>
  );
}

export default CameraSettings;
