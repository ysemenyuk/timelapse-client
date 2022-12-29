import React from 'react';
import { Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';

function CameraSettings() {
  const selectedCamera = useOutletContext();

  return (
    <Col md={12} className="mb-4">
      {`Camera Settings: ${selectedCamera.name}`}
    </Col>
  );
}

export default CameraSettings;
