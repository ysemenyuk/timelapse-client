import React from 'react';
import { Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import { Player } from 'video-react';

function CameraLive() {
  const { selectedCamera } = useOutletContext();

  return (
    <Col md={12} className="mb-4">
      <div>{`Name: ${selectedCamera.name}`}</div>
      <video src="ws://localhost:9999" controls muted width="100%" height="100%">
        <source type="video/mp4" />
      </video>
      <Player
        autoPlay
        src="ws://localhost:9999"
      />
    </Col>
  );
}

export default CameraLive;
