import React from 'react';
import { Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';

function CameraLive() {
  const { selectedCamera } = useOutletContext();

  return (
    <Col md={12} className="mb-4">
      <div>{`Name: ${selectedCamera.name}`}</div>
      <video controls muted width="100%" height="100%">
        <source type="video/mp4" />
      </video>
    </Col>
  );
}

export default CameraLive;
